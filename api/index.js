require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const PostModel = require("./models/Post");

const cors = require("cors");
const { log } = require("console");
const app = express();

const allowedOrigins = [
  "https://blog-app-du13.vercel.app",
  "https://noir-rose.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());
app.use(cookieParser());
const salt = bcrypt.genSaltSync(10);
const secret = "f834rfnjefn934rhfeuifn34fj";

const authMiddleware = require("./middleware/auth.js");

app.use("/uploads", express.static(__dirname + "/uploads"));

const YOUR_CONNECTION_STRING = process.env.YOUR_CONNECTION_STRING;
// console.log("YOUR_CONNECTION_STRING", YOUR_CONNECTION_STRING);

const PORT = 4000;

mongoose
  .connect(YOUR_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    app.get("/posts", async (req, res) => {
      try {
        const posts = await Post.find()
          .populate("author", ["firstName", "lastName", "email"])
          .sort({ createdAt: -1 })
          .limit(15);
        res.json(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Server error" });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

//////////////////////////////////////////////////////
// const passwordRoutes = require("./routes/password");
// app.use(passwordRoutes);

const postsRoutes = require("./routes/posts");
app.use(postsRoutes);
//////////////////////////////////////////////////////

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const userInfo = await User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userInfo);
  } catch (error) {
    res.status(400).json(error);
  }
});

/**
 * Promisified version of jwt.sign
 * @param {Object} payload - JWT payload.
 * @param {string} secret - Secret key for JWT.
 * @returns {Promise<string>} - A promise that resolves with the token.
 */
const signToken = (payload, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, {}, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userInfo = await User.findOne({ email }).populate(
      "followers following"
    );

    if (!userInfo) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, userInfo.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const payload = {
      id: userInfo._id,
      email,
    };

    const token = await signToken(payload, secret);

    // res.cookie("token", token);
    res.cookie("token", token, {
      httpOnly: true, // JavaScriptからのアクセスを制限
      secure: process.env.NODE_ENV === "production", // 本番環境ではHTTPS接続でのみクッキーを送信
      sameSite: "lax", // サードパーティのサイトからのクッキー送信を制限
    });
    // console.log("token", token);

    res.json({
      id: userInfo._id,
      email,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      followers: userInfo.followers,
      userIcon: userInfo.userIcon,
      following: userInfo.following,
      bio: userInfo.bio,
      createdAt: userInfo.createdAt || new Date("2023-07-31").toISOString(),
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

//////////// Profile endpoints ///////////////////////////////////////////
app.get("/profile", authMiddleware, async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, async (err, info) => {
    if (err) {
      return res.status(401).json({ message: "Token verification failed." });
    }
    try {
      // JWTからユーザーIDを取得（仮定）
      const userId = info.id;

      // データベースからユーザーIDを使用して最新の情報を取得
      const updatedUserInfo = await User.findById(userId);
      if (!updatedUserInfo) {
        return res.status(404).json({ message: "User not found." });
      }

      res.json(updatedUserInfo);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  });
});

/////////////// FetchUser ///////////////////////////////////////
app.get("/profile/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Got User Info", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const authProfile = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      return res.status(401).json({ message: "認証エラー" });
    }
    req.userId = info.id;
    next();
  });
};

app.post("/updateProfile", authProfile, async (req, res) => {
  const { firstName, lastName, userIcon, bio } = req.body;
  // console.log("req.userId:", req.userId);

  try {
    const user = await User.findById(req.userId);
    // const user = await User.findById(info.id); // ユーザーIDに基づいてユーザー情報を検索
    // console.log("user", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (userIcon) user.userIcon = userIcon;
    if (bio !== undefined && bio !== null) user.bio = bio;

    await user.save();
    res.status(200).json({ message: "プロファイルが更新されました", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "サーバーエラーが発生しました" });
  }
});

///////////////////////////////////////////////////////////////////////////////////

app.post("/logout", (req, res) => {
  res.clearCookie("token").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  if (!req.file) {
    console.log("ファイルなし");
    // ファイルがアップロードされていない場合のエラーハンドリング
    return res
      .status(400)
      .json({ error: "ファイルがアップロードされていません" });
  }

  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const newPost = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(newPost);
  });
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["firstName", "lastName", "email"])
      .sort({ createdAt: -1 })
      .limit(15)
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postInfo = await Post.findById(id).populate("author", [
    "firstName",
    "lastName",
    "email",
  ]);
  res.json(postInfo);
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["firstName", "lastName", "email"])
      .sort({ createdAt: -1 })
      .limit(15);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//////////////////////////////////////////////////////////
app.use("/favorites", authMiddleware); // この行を追加
app.post("/favorites", async (req, res) => {
  const { postId } = req.body;
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      res.status(401).json({ message: "認証エラー" });
    } else {
      try {
        const user = await User.findById(info.id);
        user.favorites.push(postId);
        await user.save();
        res.status(200).json({ message: "お気に入りに追加されました" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "サーバーエラーが発生しました" });
      }
    }
  });
});

app.use("/favorites", authMiddleware);
app.get("/favorites", async (req, res) => {
  try {
    const user = await User.findById(req.userData.id).populate({
      path: "favorites",
      populate: {
        path: "author",
        select: "firstName lastName",
      },
    });
    const favorites = user.favorites;
    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "サーバーエラーが発生しました" });
  }
});

// app.use("/favorites", authMiddleware);
// app.get("/favorites", async (req, res) => {
//   try {
//     const user = await User.findById(req.userData.id).populate("favorites");
//     const favorites = user.favorites;
//     res.status(200).json(favorites);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "サーバーエラーが発生しました" });
//   }
// });

app.delete("/favorites/:postId", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      res.status(401).json({ message: "認証エラー" });
    } else {
      try {
        const user = await User.findById(info.id);
        const { postId } = req.params;
        const index = user.favorites.indexOf(postId);
        if (index > -1) {
          user.favorites.splice(index, 1);
          await user.save();
          res.status(200).json({ message: "お気に入りから削除されました" });
        } else {
          res.status(404).json({ message: "お気に入りが見つかりません" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "サーバーエラーが発生しました" });
      }
    }
  });
});

//////////////////////////////////////////////////////////////////////
app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userInfo = await User.findById(userId);
    if (!userInfo) {
      return res.status(404).json({ error: "User not found" });
    }

    // 必要なユーザー情報を返す
    const { firstName, lastName, followers, userIcon } = userInfo;
    res.json({ firstName, lastName, followers, userIcon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

///////////////// Comment ////////////////////////////////

// コメントを投稿するためのエンドポイント
app.post("/post/comments/:postId", async (req, res) => {
  // JWT トークンを使用してユーザー情報を取得
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ message: "認証エラー" });
    }

    try {
      const post = await PostModel.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      const comment = {
        author: info.id,
        content: req.body.content,
      };
      post.comments.push(comment);
      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.toString() });
    }
  });
});

// コメントを読み込むためのサーバーエンドポイント................................
app.get("/post/comments/:postId", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId).populate(
      "comments.author"
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// アップデートコメント.................................................
app.put("/posts/:postId/comments/:commentId", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { postId, commentId } = req.params;
    const { content } = req.body;

    try {
      const post = await PostModel.findById(postId);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      // Check if the comment exists
      const comment = post.comments.find(
        (comment) => comment._id.toString() === commentId
      );

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      if (String(comment.author) !== String(info.id)) {
        return res
          .status(403)
          .json({ error: "You are not the author of this comment" });
      }

      // Update the comment
      comment.content = content;

      // Save the post
      await post.save();

      res.json({ message: "Comment updated", comment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });
});

//delete ........................................................
app.delete("/posts/:postId/comments/:commentId", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    const { postId, commentId } = req.params;

    try {
      const post = await PostModel.findById(postId);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      // Check if the comment exists
      const commentIndex = post.comments.findIndex(
        (comment) => comment._id.toString() === commentId
      );

      if (commentIndex === -1) {
        return res.status(404).json({ error: "Comment not found" });
      }

      // Remove the comment
      post.comments.splice(commentIndex, 1);

      // Save the post
      await post.save();

      res.json({ message: "Comment deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });
});

///////////// Security //////////////////////////////////////
app.post("/updatePassword", authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body; // リクエストから現在のパスワードと新しいパスワードを取得

  try {
    const user = await User.findById(req.userData.id); // ユーザーIDに基づいてユーザー情報を検索

    if (!user) {
      return res.status(404).json({
        success: false, // 追加
        error: "User not found",
      });
    }

    // 現在のパスワードが正しいか確認

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Incorrect current password",
      });
    }

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    await user.save(); // 更新されたユーザー情報を保存
    res.status(200).json({
      success: true,
      message: "Password is Updated",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

///////////////////////////////////////////////////////
app.post("/updateEmail", authMiddleware, async (req, res) => {
  const { currentEmail, newEmail } = req.body; // リクエストから現在のパスワードと新しいパスワードを取得
  // console.log("newEmail:", newEmail);
  // console.log("currentEmail:", currentEmail);

  try {
    const user = await User.findById(req.userData.id); // ユーザーIDに基づいてユーザー情報を検索
    // console.log("user:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    // 現在のEmailが正しいか確認
    const isEmailCorrect = currentEmail === user.email;
    if (!isEmailCorrect) {
      return res.status(401).json({
        success: false,
        message: "Incorrect current Email",
      });
    }

    if (newEmail) {
      user.email = newEmail;
    }

    await user.save(); // 更新されたユーザー情報を保存
    res.status(200).json({
      success: true,
      message: "Email is Updated",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// トークンなしパシワード変更 /////////////////////////////////////////////
// app.post("/updatePassword", async (req, res) => {
//   const { userId, currentPassword, newPassword } = req.body;
//   console.log("newPassword:", newPassword);

//   try {
//     const user = await User.findById(userId); // ここを変更

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         error: "User not found",
//       });
//     }

//     const isPasswordCorrect = await bcrypt.compare(
//       currentPassword,
//       user.password
//     );

//     if (!isPasswordCorrect) {
//       return res.status(401).json({
//         success: false,
//         message: "Incorrect current password",
//       });
//     }

//     if (newPassword) {
//       const hashedPassword = await bcrypt.hash(newPassword, 10);
//       user.password = hashedPassword;
//     }

//     await user.save();
//     res.status(200).json({
//       success: true,
//       message: "Password is Updated",
//       user,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });
//// トークンなしパシワード変更 ///////////////////////////////////////

/////////// Reset password /////////////////////
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// ...

app.post("/password/forgot", async (req, res) => {
  const { email } = req.body;
  // console.log("forgotPassword Email", email);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No user found with this email address",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const mailOptions = {
      to: user.email,
      from: "your_email@gmail.com",
      subject: "Password Reset",
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account of MERN-Blog.\n\nPlease click on the following link, or paste it into your browser to complete the process:\n\nhttp://localhost:5173/password/reset/${resetToken}\n\nThis link will be experd in 1 hour.\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
      // text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste it into your browser to complete the process:\n\nhttp://${req.headers.host}/password/reset/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Failed to send email",
        });
      }
      res.status(200).json({
        success: true,
        message: "Reset token sent to email",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

///////////////
app.post("/password/reset/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    // console.log("User:", user);

    if (!user) {
      console.log("User not found or token expired");
      return res.status(400).json({
        success: false,
        message: "Password reset token is invalid or has expired",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password has been reset",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

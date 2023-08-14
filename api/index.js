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

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

// mongoose.connect(
//   "mongodb+srv://blog-app:blog-app123@cluster0.nv5qviq.mongodb.net/?retryWrites=true&w=majority"
// );

const YOUR_CONNECTION_STRING =
  "mongodb+srv://blog-app:blog-app123@cluster0.nv5qviq.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(YOUR_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

const salt = bcrypt.genSaltSync(10);
const secret = "f834rfnjefn934rhfeuifn34fj";

app.post("/register", async (req, res) => {
  // const { userName, password } = req.body;
  const { firstName, lastName, email, password } = req.body;
  // console.log(firstName, lastName, email, password);
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

app.post("/login", async (req, res) => {
  console.log("loginnnnnnnnnnnnnn------------------");
  const { email, password } = req.body;
  try {
    const userInfo = await User.findOne({ email }).populate(
      "followers following"
    );
    if (!userInfo) {
      return res.status(404).json({ error: "User not found" });
    }

    const passCheck = bcrypt.compareSync(password, userInfo.password);
    if (!passCheck) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    jwt.sign(
      {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email,
        id: userInfo._id,
        followers: userInfo.followers,
        userIcon: userInfo.userIcon,
        following: userInfo.following,
        bio: userInfo.bio,
      },
      secret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token, { httpOnly: true }).json({
          id: userInfo._id,
          email,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          followers: userInfo.followers,
          userIcon: userInfo.userIcon,
          following: userInfo.following,
          bio: userInfo.bio,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//////////// Profile endpoints ///////////////////////////////////////////
// app.get("/profile", (req, res) => {
//   const { token } = req.cookies;
//   jwt.verify(token, secret, {}, (err, info) => {
//     if (err) throw err;
//     console.log("INFO:", info); // こちらに移動
//     res.json(info);
//   });
// });

app.get("/profile", async (req, res) => {
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

app.post("/updateProfile", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ message: "認証エラー" });
    }

    const { firstName, lastName, userIcon, bio } = req.body; // リクエストから更新したいデータを取得

    try {
      const user = await User.findById(info.id); // ユーザーIDに基づいてユーザー情報を検索

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // 更新したい情報が提供されていれば、ユーザーオブジェクトの該当フィールドを更新
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (userIcon) user.userIcon = userIcon;
      if (bio) user.bio = bio;

      await user.save(); // 更新されたユーザー情報を保存

      res.status(200).json({ message: "プロファイルが更新されました", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "サーバーエラーが発生しました" });
    }
  });
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

app.get("/favorites", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      res.status(401).json({ message: "認証エラー" });
    } else {
      try {
        const user = await User.findById(info.id).populate("favorites");
        const favorites = user.favorites;
        res.status(200).json(favorites);
        console.log("Server favorites", favorites);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "サーバーエラーが発生しました" });
      }
    }
  });
});

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

///////////////////////////////////////////////////

app.listen(4000, () => {});

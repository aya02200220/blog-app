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

const cors = require("cors");
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

// mongoose.connect(
//   "mongodb+srv://blog-app:blog-app123@cluster0.nv5qviq.mongodb.net/?retryWrites=true&w=majority"
// );
mongoose.connect(
  "mongodb+srv://blog-app:" +
    encodeURIComponent("blog-app123") +
    "@cluster0.nv5qviq.mongodb.net/blog-app?retryWrites=true&w=majority"
);

const salt = bcrypt.genSaltSync(10);
const secret = "f834rfnjefn934rhfeuifn34fj";

app.post("/register", async (req, res) => {
  // const { userName, password } = req.body;
  const { firstName, lastName, email, password } = req.body;
  console.log(firstName, lastName, email, password);
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
  // const { userName, password } = req.body;
  const { firstName, lastName, email, password } = req.body;
  const userInfo = await User.findOne({ email });
  const passCheck = bcrypt.compareSync(password, userInfo.password);
  if (passCheck) {
    // Login
    jwt.sign(
      {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email,
        id: userInfo._id,
      },
      secret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userInfo._id,
          email,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
        });
      }
    );
  } else {
    res.status(404).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
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

///////////////////////////////////////////////////
app.post("/post/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = {
      author,
      content,
    };
    post.comments.push(comment);
    await post.save();

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/post/:id/comments", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post.comments);
  } catch (error) {
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
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "サーバーエラーが発生しました" });
      }
    }
  });
});

app.listen(4000, () => {});

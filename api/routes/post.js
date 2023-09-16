require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const PostModel = require("../models/Post");
const secret = process.env.JWT_SECRET;
const router = express.Router();

//////////// Delete Post ///////////////////////
router.delete("/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the post" });
  }
});

//////////// Get Post By Author ID ///////////////////////
router.get("/post/account/:authorId", async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const posts = await Post.find({ author: authorId })
      .populate("author", ["firstName", "lastName", "email"])
      .sort({ createdAt: -1 })
      .limit(15);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts by author:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/post", uploadMiddleware.single("file"), async (req, res) => {
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

router.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["firstName", "lastName", "email"])
      .sort({ createdAt: -1 })
      .limit(15)
  );
});

router.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postInfo = await Post.findById(id).populate("author", [
    "firstName",
    "lastName",
    "email",
  ]);
  res.json(postInfo);
});

router.post("/post", uploadMiddleware.single("file"), async (req, res) => {
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

///////////////// Comment ////////////////////////////////

// コメントを投稿するためのエンドポイント
router.post("/post/comments/:postId", async (req, res) => {
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
router.get("/post/comments/:postId", async (req, res) => {
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

module.exports = router;

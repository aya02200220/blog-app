require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const User = require("../models/User");
const Post = require("../models/Post");
const PostModel = require("../models/Post");
const secret = process.env.JWT_SECRET;
const router = express.Router();

require("../controller/cloudinaryConfig");

// Use memoryStorage to handle the file as a buffer.
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    fieldSize: 10 * 1024 * 1024, // 10MB
  },
});

////// new post //////////////
router.post("/post", upload.single("file"), async (req, res) => {
  if (!req.file) {
    console.log("ファイルなし");
    return res
      .status(400)
      .json({ error: "ファイルがアップロードされていません" });
  }

  try {
    const uploadResponse = await cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
        },
        async (error, result) => {
          if (error) throw error;

          const imagePath = result.url;

          const { token } = req.cookies;
          jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err;
            const { title, summary, content } = req.body;

            const newPost = await Post.create({
              title,
              summary,
              content,
              cover: imagePath,
              author: info.id,
            });

            res.json(newPost);
          });
        }
      )
      .end(req.file.buffer);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ error: "Failed to upload image to Cloudinary" });
  }
});

////// edit post //////////////
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      )
      .end(fileBuffer);
  });
};

router.put("/post", upload.single("file"), async (req, res) => {
  let imagePath;

  console.log("Received data:", req.body, req.file);

  if (req.file) {
    try {
      const result = await uploadToCloudinary(req.file.buffer);
      imagePath = result.url;
      // console.log("Cloudinary result:", result);
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return res
        .status(500)
        .json({ error: "Failed to upload image to Cloudinary" });
    }
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
      cover: imagePath ? imagePath : postDoc.cover,
    });

    const updatedPost = await Post.findById(id); // 更新後のドキュメントを取得
    res.json(updatedPost); // 更新後のドキュメントを返す
  });
});

////// get posts //////////////
router.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["firstName", "lastName", "email"])
      .sort({ createdAt: -1 })
      .limit(15)
  );
});

////// get a post by post ID //////////////
router.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postInfo = await Post.findById(id).populate("author", [
    "firstName",
    "lastName",
    "email",
  ]);
  res.json(postInfo);
});

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

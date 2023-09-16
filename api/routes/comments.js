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

///// get comment  ///////////////////////////
router.get("/comments", async (req, res) => {
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

// アップデートコメント...................
router.put("/comments/:postId/:commentId", async (req, res) => {
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

//delete comment ...................................
router.delete("/comments/:postId/:commentId", async (req, res) => {
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

module.exports = router;

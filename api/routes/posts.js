const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Post = mongoose.model("Post");

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

module.exports = router;

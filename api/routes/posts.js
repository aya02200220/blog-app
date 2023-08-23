const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Post = mongoose.model("Post");

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

module.exports = router;

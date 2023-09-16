const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/auth.js");
const secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

////// add favorites ////////////////////////
router.use("/favorites", authMiddleware);
router.post("/favorites", async (req, res) => {
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

////// get favorites ////////////////////////
router.use("/favorites", authMiddleware);
router.get("/favorites", async (req, res) => {
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

////// delete favorites ////////////////////////
router.delete("/favorites/:postId", async (req, res) => {
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

module.exports = router;

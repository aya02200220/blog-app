const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const User = mongoose.model("User");
const secret = process.env.JWT_SECRET;

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

router.post("/login", async (req, res) => {
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

module.exports = router;

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      return res.status(401).json({ message: "認証エラー" });
    }
    req.userId = info.id;
    next();
  });
};

// プロファイル取得のエンドポイント
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const updatedUserInfo = await User.findById(userId);
    if (!updatedUserInfo) {
      return res.status(404).json({ message: "User not found." });
    }

    // MongooseのドキュメントをJavaScriptオブジェクトに変換
    const userInfoObj = updatedUserInfo.toObject();

    // _idをidに変更
    userInfoObj.id = userInfoObj._id;
    delete userInfoObj._id;

    // console.log("updatedUserInfo", userInfoObj);
    res.json(userInfoObj);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// 特定のユーザー情報を取得するエンドポイント
router.get("/profile/:_id", async (req, res) => {
  const { _id } = req.params;
  // console.log(_id);
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

// Update Profile ////////////////////////
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

router.post("/profile/update", authMiddleware, async (req, res) => {
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

module.exports = router;

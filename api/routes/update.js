const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth.js");
const bcrypt = require("bcryptjs");

///////////// Security //////////////////////////////////////
router.post("/update/password", authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body; // リクエストから現在のパスワードと新しいパスワードを取得

  try {
    const user = await User.findById(req.userData.id); // ユーザーIDに基づいてユーザー情報を検索

    if (!user) {
      return res.status(404).json({
        success: false, // 追加
        error: "User not found",
      });
    }

    // 現在のパスワードが正しいか確認

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Incorrect current password",
      });
    }

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    await user.save(); // 更新されたユーザー情報を保存
    res.status(200).json({
      success: true,
      message: "Password is Updated",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

///////////////////////////////////////////////////////
router.post("/update/email", authMiddleware, async (req, res) => {
  const { currentEmail, newEmail } = req.body; // リクエストから現在のパスワードと新しいパスワードを取得
  // console.log("newEmail:", newEmail);
  // console.log("currentEmail:", currentEmail);

  try {
    const user = await User.findById(req.userData.id); // ユーザーIDに基づいてユーザー情報を検索
    // console.log("user:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    // 現在のEmailが正しいか確認
    const isEmailCorrect = currentEmail === user.email;
    if (!isEmailCorrect) {
      return res.status(401).json({
        success: false,
        message: "Incorrect current Email",
      });
    }

    if (newEmail) {
      user.email = newEmail;
    }

    await user.save(); // 更新されたユーザー情報を保存
    res.status(200).json({
      success: true,
      message: "Email is Updated",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;

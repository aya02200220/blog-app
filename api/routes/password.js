const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");

const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

// ...

// トークンなしパシワード変更 /////////////////////////////////////////////
// router.post("/update/password", async (req, res) => {
//   const { userId, currentPassword, newPassword } = req.body;
//   console.log("newPassword:", newPassword);

//   try {
//     const user = await User.findById(userId); // ここを変更

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         error: "User not found",
//       });
//     }

//     const isPasswordCorrect = await bcrypt.compare(
//       currentPassword,
//       user.password
//     );

//     if (!isPasswordCorrect) {
//       return res.status(401).json({
//         success: false,
//         message: "Incorrect current password",
//       });
//     }

//     if (newPassword) {
//       const hashedPassword = await bcrypt.hash(newPassword, 10);
//       user.password = hashedPassword;
//     }

//     await user.save();
//     res.status(200).json({
//       success: true,
//       message: "Password is Updated",
//       user,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });
//// トークンなしパシワード変更 ///////////////////////////////////////

/////////// Reset password /////////////////////

// ...

router.post("/password/forgot", async (req, res) => {
  const { email } = req.body;
  // console.log("forgotPassword Email", email);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No user found with this email address",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const mailOptions = {
      to: user.email,
      from: "your_email@gmail.com",
      subject: "Password Reset",
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account of MERN-Blog.\n\nPlease click on the following link, or paste it into your browser to complete the process:\n\nhttp://localhost:5173/password/reset/${resetToken}\n\nThis link will be experd in 1 hour.\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
      // text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste it into your browser to complete the process:\n\nhttp://${req.headers.host}/password/reset/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Failed to send email",
        });
      }
      res.status(200).json({
        success: true,
        message: "Reset token sent to email",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

///////////////
router.post("/password/reset/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    // console.log("User:", user);

    if (!user) {
      console.log("User not found or token expired");
      return res.status(400).json({
        success: false,
        message: "Password reset token is invalid or has expired",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password has been reset",
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

// const express = require("express");
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");
// const router = express.Router();

// // ...

// router.post("/forgotPassword", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         error: "No user found with this email address",
//       });
//     }

//     const resetToken = crypto.randomBytes(20).toString("hex");
//     user.passwordResetToken = resetToken;
//     user.passwordResetExpires = Date.now() + 3600000; // 1 hour
//     await user.save();

//     const mailOptions = {
//       to: user.email,
//       from: "your_email@gmail.com",
//       subject: "Password Reset",
//       text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste it into your browser to complete the process:\n\nhttp://${req.headers.host}/resetPassword/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
//     };

//     const transporter = nodemailer.createTransport({
//       // Set up your email configurations
//     });

//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({
//           success: false,
//           message: "Failed to send email",
//         });
//       }
//       res.status(200).json({
//         success: true,
//         message: "Reset token sent to email",
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });

// router.post("/resetPassword/:token", async (req, res) => {
//   const { token } = req.params;
//   const { newPassword } = req.body;

//   try {
//     const user = await User.findOne({
//       passwordResetToken: token,
//       passwordResetExpires: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Password reset token is invalid or has expired",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Password has been reset",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });

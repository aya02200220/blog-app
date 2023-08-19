const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, require: true, min: 4, unique: false },
  lastName: { type: String, require: true, min: 4, unique: false },
  email: { type: String, require: true, min: 4, unique: true },
  password: { type: String, require: true },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  followers: { type: Number, default: 0 },
  userIcon: { type: String, default: "" },
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  bio: { type: String, default: "" },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

const UserModel = model("User", UserSchema);
module.exports = UserModel;

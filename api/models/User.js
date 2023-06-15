const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// const UserSchema = new Schema({
//   userName: { type: String, require: true, min: 4, unique: true },
//   password: { type: String, require: true },
// });

// const UserSchema = new Schema({
//   userName: { type: String, require: true, min: 4, unique: true },
//   password: { type: String, require: true },
//   favorites: [{ type: Schema.Types.ObjectId, ref: "Post" }],
// });
const UserSchema = new Schema({
  firstName: { type: String, require: true, min: 4, unique: false },
  lastName: { type: String, require: true, min: 4, unique: false },
  email: { type: String, require: true, min: 4, unique: true },
  password: { type: String, require: true },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;

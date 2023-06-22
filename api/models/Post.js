const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// const PostSchema = new Schema(
//   {
//     title: String,
//     summary: String,
//     content: String,
//     cover: String,
//     author: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       firstName: String,
//       lastName: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

const CommentSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      firstName: String,
      lastName: String,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PostSchema = new Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      firstName: String,
      lastName: String,
    },
    comments: [CommentSchema], // コメントスキーマを追加
  },
  {
    timestamps: true,
  }
);

const PostModel = model("Post", PostSchema);

module.exports = PostModel;

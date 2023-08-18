const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const router = express.Router();
const uploadMiddleware = multer({ dest: "uploads/" });

router.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  if (!req.file) {
    console.log("ファイルなし");
    // ファイルがアップロードされていない場合のエラーハンドリング
    return res
      .status(400)
      .json({ error: "ファイルがアップロードされていません" });
  }

  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const newPost = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(newPost);
  });
});

module.exports = router;

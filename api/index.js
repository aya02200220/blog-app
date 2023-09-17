require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs = require("fs");
// const multer = require("multer");
// const uploadMiddleware = multer({ dest: "uploads/" });
const PostModel = require("./models/Post");

const cors = require("cors");
const { log } = require("console");
const app = express();

const allowedOrigins = [
  "https://noir-rose-r4o0l6ukr-aya02200220.vercel.app",
  "https://noir-rose-aya02200220.vercel.app/",
  "https://www.noir-rose.com",
  "https://noir-rose.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());
app.use(cookieParser());
// const salt = bcrypt.genSaltSync(10);
// const secret = process.env.JWT_SECRET;

// const authMiddleware = require("./middleware/auth.js");
// app.use("/uploads", express.static(__dirname + "/uploads"));

const YOUR_CONNECTION_STRING = process.env.YOUR_CONNECTION_STRING;
const PORT = 10000 || 3030;

mongoose
  .connect(YOUR_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    app.get("/posts", async (req, res) => {
      try {
        const posts = await Post.find()
          .populate("author", ["firstName", "lastName", "email"])
          .sort({ createdAt: -1 })
          .limit(15);
        res.json(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Server error" });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

//////////////////////////////////////////////////////

const postRoutes = require("./routes/post");
app.use(postRoutes);

const profileRoutes = require("./routes/profile");
app.use(profileRoutes);

const loginRoutes = require("./routes/login");
app.use(loginRoutes);

const passwordRoutes = require("./routes/password");
app.use(passwordRoutes);

const resisterRoutes = require("./routes/resister");
app.use(resisterRoutes);

const favoritesRoutes = require("./routes/favorites");
app.use(favoritesRoutes);

const comments = require("./routes/comments");
app.use(comments);

const update = require("./routes/update");
app.use(update);
//////////////////////////////////////////////////////

app.post("/logout", (req, res) => {
  res.clearCookie("token").json("ok");
});

//////////////////////////////////////////////////////////////////////
app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userInfo = await User.findById(userId);
    if (!userInfo) {
      return res.status(404).json({ error: "User not found" });
    }

    // 必要なユーザー情報を返す
    const { firstName, lastName, followers, userIcon } = userInfo;
    res.json({ firstName, lastName, followers, userIcon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

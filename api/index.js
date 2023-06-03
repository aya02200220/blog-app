const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://blog-app:blog-app123@cluster0.nv5qviq.mongodb.net/?retryWrites=true&w=majority"
);

const salt = bcrypt.genSaltSync(10);
const secret = "f834rfnjefn934rhfeuifn34fj";

app.post("/register", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const userInfo = await User.create({
      userName,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userInfo);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const userInfo = await User.findOne({ userName });
  const passCheck = bcrypt.compareSync(password, userInfo.password);
  if (passCheck) {
    // Login
    jwt.sign({ userName, id: userInfo._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({ id: userInfo._id, userName });
    });
  } else {
    res.status(404).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(4000);

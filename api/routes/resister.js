const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const userInfo = await User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userInfo);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;

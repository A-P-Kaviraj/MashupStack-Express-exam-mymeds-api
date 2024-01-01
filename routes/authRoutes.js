const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username });
    await User.register(user, password);
    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Login
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ success: true, message: "Login successful" });
});

module.exports = router;

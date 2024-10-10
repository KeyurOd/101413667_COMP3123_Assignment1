const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

router.post(
  '/signup',
  [
    body('username').isString(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      const newUser = new User({ username, email, password });
      await newUser.save();
      res.status(201).json({ message: "User created successfully.", user_id: newUser._id });
    } catch (err) {
      res.status(500).json({ message: "Error creating user", error: err.message });
    }
  }
);

router.post(
  '/login',
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email, password });
      if (!user) {
        return res.status(401).json({ status: false, message: "Invalid Username and password" });
      }
      res.status(200).json({ message: "Login successful." });
    } catch (err) {
      res.status(500).json({ message: "Error during login", error: err.message });
    }
  }
);

module.exports = router;

// backend/routes/auth.js

const express = require("express");
const router = express.Router();

// Dummy in-memory storage (replace with DB logic)
const users = [];

// Register
router.post("/register", (req, res) => {
  const { name, email, mobile, password, address, latitude, longitude } = req.body;
  const existing = users.find(u => u.email === email);
  if (existing) return res.status(409).json({ error: "User already exists" });

  const user = { name, email, mobile, password, address, latitude, longitude };
  users.push(user);
  res.status(201).json({ message: "Registered successfully", user });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  res.json({ message: "Login successful", user });
});

module.exports = router;

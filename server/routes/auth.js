// server/routes/auth.js

const express = require('express');
const router = express.Router();

const users = new Map(); // In-memory store (not persisted)

// POST /api/register
router.post('/register', (req, res) => {
  console.log('👉 Incoming POST /register');
  console.log('🧾 Request body:', req.body);

  const { username, publicKey, vault, salt, iv } = req.body;

  if (!username || !publicKey || !vault || !salt || !iv) {
    console.log('❌ Missing required fields');
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (users.has(username)) {
    console.log('⚠️ Username already exists');
    return res.status(409).json({ message: 'Username already exists' });
  }

  users.set(username, { publicKey, vault, salt, iv });
  console.log(`✅ Registered user: ${username}`);
  console.log(users.get(username));

  return res.status(201).json({ message: 'User registered successfully' });
});

// POST /api/login
router.post('/login', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  if (!users.has(username)) {
    return res.status(404).json({ message: 'User not found' });
  }

  const userData = users.get(username);
  return res.status(200).json(userData); // includes vault, salt, iv, publicKey
});

module.exports = router;

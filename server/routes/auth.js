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

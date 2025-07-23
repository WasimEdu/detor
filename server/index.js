
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes); // proxy target

app.listen(3000, () => {
  console.log('🚀 Server listening on http://localhost:3000');
});

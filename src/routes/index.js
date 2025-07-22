const express = require('express');
const router = express.Router();
const canadaDayRoutes = require('./canada-day');

// Mount Canada Day calculator routes
router.use(canadaDayRoutes);

// Example API routes
router.get('/api/users', (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]
  });
});

router.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      message: 'Name and email are required',
      status: 'error'
    });
  }
  
  res.status(201).json({
    message: 'User created successfully',
    user: { id: Date.now(), name, email },
    status: 'success'
  });
});

module.exports = router;

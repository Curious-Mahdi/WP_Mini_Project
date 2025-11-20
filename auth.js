const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup page
router.get('/signup', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/learning/modules');
  }
  res.render('signup', { error: null });
});

// Signup handler
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.render('signup', { error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.render('signup', { error: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('signup', { error: 'Email already registered' });
    }

    const user = new User({ name, email, password });
    await user.save();

    req.session.userId = user._id;
    req.session.userName = user.name;
    res.redirect('/learning/modules');
  } catch (error) {
    res.render('signup', { error: 'An error occurred. Please try again.' });
  }
});

// Login page
router.get('/login', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/learning/modules');
  }
  res.render('login', { error: null });
});

// Login handler
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render('login', { error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    req.session.userId = user._id;
    req.session.userName = user.name;
    res.redirect('/learning/modules');
  } catch (error) {
    res.render('login', { error: 'An error occurred. Please try again.' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/learning/modules');
    }
    res.redirect('/');
  });
});

module.exports = router;





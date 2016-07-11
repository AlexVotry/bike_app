const express = require('express');
const router = express.Router();
const models = require('../db/models');

router.get('/logout', (req, res, next) => {
  req.user = null;
  res.redirect('/');
});

router.get('/', models.ensureAuthenticated,(req, res) => {
  console.log('index auth');
  res.render('login', { user: req.user });
});

module.exports = router;

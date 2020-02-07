const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res) => {
  if(!req.user) {
    res.render('login');
  } else {
    res.redirect('/');
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/vk', passport.authenticate('vkontakte', {
  scope: ['friends', 'offline']
  // scope: ['friends', 'offline', 'email']
}));

router.get('/vk/redirect',
    passport.authenticate('vkontakte'),
    (req, res) => {
      res.redirect('/');
    }
);

module.exports = router;

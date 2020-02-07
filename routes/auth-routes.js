const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res) => {
  res.send('login');
});

router.get('/logout', (req, res) => {
  res.send('logout');
});

router.get('/vk', passport.authenticate('vkontakte', {
  scope: ['friends', 'offline']
}));

router.get('/vk/redirect',
    passport.authenticate('vkontakte'),
    (req, res) => {
      res.send('callback URI');
    }
);

module.exports = router;

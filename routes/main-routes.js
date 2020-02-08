const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const authCheck = (req, res, next) => {
  if(req.user) {
    next();
  } else {
    res.redirect('/auth/login');
  }
};

const getVKFriends = async (user, count) => {
  const uri = 'https://api.vk.com/method/friends.get';
  const params = {
    access_token: user.accessToken,
    fields: 'photo_50,domain',
    order: 'random',
    v: '5.103',
    count
  };
  const query = Object.keys(params).map(k => k + '=' + params[k]).join('&');
  const res = await fetch(uri + '?' + query);
  const json = await res.json();
  return json.error ? [] : json.response.items;
};

router.get('/', authCheck, async (req, res) => {
  const friends = await getVKFriends(req.user, 5);
  res.render('main', { user: req.user, friends });
});

module.exports = router;

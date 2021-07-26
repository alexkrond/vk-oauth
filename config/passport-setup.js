const passport = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const User = require('../models/user-model.js');
const fetch = require('node-fetch');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
    'vkontakte',
    new OAuth2Strategy({
          authorizationURL: 'https://oauth.vk.com/authorize',
          tokenURL: 'https://oauth.vk.com/access_token',
          clientID: process.env.VK_APP_ID,
          clientSecret: process.env.VK_APP_SECRET,
          callbackURL: '/auth/vk/redirect',
          apiVersion: '5.103'
        },
        async (accessToken, refreshToken, profile, done) => {
          const uri = `https://api.vk.com/method/users.get?v=5.103&access_token=${accessToken}`;
          const res = await fetch(uri);
          const json = await res.json();
          if (json.error) {
            return done(null, false);
          }
          profile.id = json.response[0].id;
          profile.displayName = json.response[0].first_name + ' ' + json.response[0].last_name;

          const currentUser = await User.findOne({vkId: profile.id});
          if (currentUser) {
            done(null, currentUser);
          } else {
            const newUser = await new User({
              vkId: profile.id,
              username: profile.displayName,
              accessToken: accessToken
            }).save();
            done(null, newUser);
          }
        })
);

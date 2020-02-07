const passport = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const User = require('../models/user-model.js');

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
        (accessToken, refreshToken, profile, done) => {
          User.findOne({vkId: profile.id})
              .then(currentUser => {
                if (currentUser) {
                  done(null, currentUser);
                } else {
                  new User({
                    vkId: profile.id,
                    username: profile.displayName,
                    accessToken: accessToken
                  }).save()
                      .then(newUser => {
                        done(null, newUser);
                      });
                }
              });
        }
    )
);

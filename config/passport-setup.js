const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const User = require('../models/user-model.js');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
      .then(user => {
        done(null, user);
      });
});

passport.use(
    new VKontakteStrategy({
          clientID: process.env.VK_APP_ID,
          clientSecret: process.env.VK_APP_SECRET,
          callbackURL: '/auth/vk/redirect',
          apiVersion: '5.103'
        },
        (accessToken, refreshToken, params, profile, done) => {
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

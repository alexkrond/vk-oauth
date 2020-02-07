const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;

passport.use(
    new VKontakteStrategy({
          clientID: process.env.VK_APP_ID,
          clientSecret: process.env.VK_APP_SECRET,
          callbackURL: '/auth/vk/redirect',
          apiVersion: '5.103'
        },
        () => {

        }
    )
);

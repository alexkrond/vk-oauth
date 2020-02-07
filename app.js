require('dotenv').config();
require('./config/passport-setup.js');

const express = require('express');
const authRouter = require('./routes/auth-routes.js');
const mainRouter = require('./routes/main-routes.js');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();


app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use((req, res) => {
  res.status(404).send('404. Страницы не существует.');
});


const PORT = process.env.PORT || 5000;
(async () => {
  await mongoose.connect(
      process.env.MONGODB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      () => {
        console.log('connected to mongodb');
      }
  );
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
})();

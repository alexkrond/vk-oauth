require('dotenv').config();
const express = require('express');
const authRouter = require('./routes/auth-routes.js');
const passportSetup = require('./config/passport-setup.js');
const app = express();


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/auth', authRouter);
app.use((req, res) => {
  res.status(404).send('404');
});


const PORT = process.env.PORT ||  5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

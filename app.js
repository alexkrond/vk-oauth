require('dotenv').config();
require('./config/passport-setup.js');

const express = require('express');
const authRouter = require('./routes/auth-routes.js');
const mongoose = require('mongoose');
const app = express();


app.set('view engine', 'ejs');

mongoose.connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    () => {
      console.log('connected to mongodb');
    }
);

app.use(express.static('public'));

// app.get('/fail', (req, res) => res.send('fail'));

app.use('/auth', authRouter);
app.use((req, res) => {
  res.status(404).send('404');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

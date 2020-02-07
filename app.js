const express = require('express');
const app = express();


app.use(express.static('public'));
app.use((req, res) => {
  res.status(404).send('404');
});


const PORT = process.env.PORT ||  5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

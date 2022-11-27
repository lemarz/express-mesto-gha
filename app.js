const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = { _id: '6383216b5148354f391d2335' };
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен...');
});

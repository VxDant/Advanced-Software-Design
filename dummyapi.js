const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const users = require('./users');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
    res.json(users);  // Serve the users data as JSON
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
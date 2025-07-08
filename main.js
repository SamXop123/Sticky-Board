const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('templates/index.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`StickyBoard Running on port ${port}`);
});
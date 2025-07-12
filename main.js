const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 

app.get('/', (req, res) => {
  res.sendFile('templates/index.html', { root: __dirname });
});

const tasks = [];
app.post('/submit-task', (req, res) => {
  const { title, description } = req.body;
  const id = Date.now(); // Unique ID
  tasks.push({ id, title, description });
  console.log('New Task:', title, '\nDescription:', description);
  res.json({ id, title, description });
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`StickyBoard Running on port ${port}`);
});

module.exports = app;
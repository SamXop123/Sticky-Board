const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
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

app.listen(process.env.PORT || 3000, () => {
  console.log(`StickyBoard Running on port ${process.env.PORT || 3000}`);
});

module.exports = app;
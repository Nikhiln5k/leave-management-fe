const express = require('express');
const path = require('path');

const app = express();

const PORT = 6000;

app.use(express.static(path.join(__dirname, 'dist/leave-management-fe')));

app.get((req, res) => {
  res.sendFile(path.join(__dirname, 'dist/leave-management-fe/browser/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.info(`Server running on port ${PORT}`);
});
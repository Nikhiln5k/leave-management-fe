const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 6000;
const distPath = path.join(__dirname, 'dist/leave-management-fe/browser');

app.use(express.static(distPath));

app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const imagesDir = path.join(__dirname, 'public', 'images');

// Serve static files (HTML, JS, images)
app.use(express.static('public'));

// Endpoint to list image files
app.get('/images-list', (req, res) => {
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read image folder' });
    }
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
    );
    res.json(imageFiles);
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

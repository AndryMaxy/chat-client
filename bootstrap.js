const express = require('express');
const path = require('path');

const PORT = 4300;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log('server running');
});

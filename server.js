const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist/exy/browser')));

app.get('/*', (req, res) =>
  res.sendFile('index.html', { root: 'dist/exy/browser' }),
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
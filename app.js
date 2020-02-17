const express = require('express');
const app = express();
const path = require('path');

const viewsFolder = path.join(__dirname, '/views');
app.use(express.static(__dirname + '/public'));
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render(`${viewsFolder}/index.ejs`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

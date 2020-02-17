// Import the required modules
const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Remove x-powered-by express in response
app.disable('x-powered-by');

// Load the environment variables
dotenv.config();

// Allow for Node to serve static files (css, js, images)
app.use(express.static(__dirname + '/public'));
const port = 3000;

// Parses body of requests to JSON
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.set('view engine', 'ejs');

// Import the router for request mapping
const weatherRouter = require(path.join(__dirname + '/weather-app-routes'));
app.use('/', weatherRouter);

// Start up the application
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

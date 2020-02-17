const express = require('express');
const router = express.Router();

const weatherController = require(__dirname + '/controllers/weatherController');

router.get('/', weatherController.index);

module.exports = router;

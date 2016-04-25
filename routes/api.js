'use strict';

var express = require('express');
var router = express.Router();

router.use('/grades', require('./grades'));

module.exports = router;

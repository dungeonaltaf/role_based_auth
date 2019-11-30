var express = require('express');
var mysql = require('mysql');
var conn = require('../app');

var router = express.Router();


var path = require('path');
var bodyparser = require('body-parser');
var urlencoder = bodyparser.urlencoded({extended:false});


module.exports = router;
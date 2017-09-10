'use strict';
var mysql = require('mysql2/promise')

var DEVELOPMENT_DB = 'BarCodeScanner'
  , TEST_DB = 'app_test_database'

var connection=mysql.createPool({ 
	host:'localhost',
	user:'root',
	password:'',
	database:DEVELOPMENT_DB
});
module.exports=connection;
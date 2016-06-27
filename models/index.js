'use strict'

const config = require('../config');
const mysql = require('mysql');

const conn = mysql.createConnection({
	host : config.db.host,
	user : config.db.username,
	password : config.db.password,
	database : config.db.database
});

conn.connect();

exports.conn = conn;

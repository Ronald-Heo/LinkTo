'use strict'

// const config = require('../config');
// import config from '../config';
import mysql from 'mysql';

const conn = mysql.createConnection({
	host : 'localhost',
	user : 'linkto',
	password : '1234qwer',
	database : 'linkto'
});

conn.connect();

export default conn;
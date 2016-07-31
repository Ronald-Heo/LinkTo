'use strict'

const _ = require('lodash');
var conn = require('./index').conn;
// import _ from 'lodash';
// import conn from './index';
conn = conn.conn ? conn.conn : conn;

exports.getNameGroup = (callback) => {
	conn.query('SELECT ItemID FROM linkto.fic001 group by ItemID;', callback);
};

exports.select = (table, name, timestamp) => {
	return conn.query(`SELECT * from '${table}' where name = '${name}' and timestamp = '${timestamp}'`, function(err, rows, fields) {
		if (err)
			throw err;
	});
};

exports.select2 = () => {
	var query = conn.query(`SELECT * from fic001`, function(err, rows, fields) {
		if (err)
			throw err;
	});
	return query;
};

exports.create = () => {
	conn.query(`CREATE TABLE 'linkto'.'fic001' ('ItemID' VARCHAR(255) NULL,'ItemCurrentValue' VARCHAR(2000) NULL,'ItemTimeStamp' DATETIME NULL);`, function(err, rows, fields) {
		if (err){
			console.log(err)
			throw err;
		}
	});
};

exports.insert = (controller) => {
	var query = conn.query('Insert into fic001 set ?;', controller, function(err, result) {
		if (err) {
			throw err;
		}
	});
};

exports.getControllerData = (callback) => {
	var query = conn.query(`SELECT * FROM linkto.fic001 where ItemID LIKE '%FIC001%' order by ItemID, ItemTimeStamp`, callback);
};

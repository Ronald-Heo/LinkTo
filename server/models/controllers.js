'use strict'

const _ = require('lodash');
var conn = require('./index').conn;
conn = conn.conn ? conn.conn : conn;

exports.getTableGroup = (callback) => {
	conn.query('show tables;', callback);
};

exports.getControllerData = (table, callback) => {
	var query = conn.query(`SELECT * FROM ${table} order by ItemID, ItemTimeStamp`, callback);
};

// 기본 함수

exports.select = (table, name, timestamp) => {
	return conn.query(`SELECT * from '${table}' where name = '${name}' and timestamp = '${timestamp}'`, function(err, rows, fields) {
		if (err)
			throw err;
	});
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

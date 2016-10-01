'use strict'

const _ = require('lodash');
var conn = require('./index').conn;
conn = conn.conn ? conn.conn : conn;

exports.getTableGroup = (callback) => {
	conn.query('show tables;', callback);
};

exports.getControllerValues = (table, category1, category2, category3, startDate, endDate, callback) => {
	var itemName = category1 + '.' + category2 + '.' + category3;
	conn.query(`SELECT * FROM ${table} where ItemID = '${itemName}' AND ItemTimeStamp BETWEEN '${startDate}' AND '${endDate}' order by ItemTimeStamp, ItemID`, callback);
};

exports.getControllerData = (table, callback) => {
	// var query = conn.query(`SELECT * FROM ${table} order by ItemTimeStamp, ItemID`, callback);
	var query = conn.query(`SELECT * FROM ${table} order by ItemTimeStamp, ItemID`, callback);
};

// 기본 함수
exports.select = (table, name, timestamp) => {
	return conn.query(`SELECT * from '${table}' where name = '${name}' and timestamp = '${timestamp}'`, function(err, rows, fields) {
		if (err)
			throw err;
	});
};

// 현재 값을 가져옴
exports.getControllerValue = (table, time, callback) => {
	conn.query(`SELECT * FROM ${table} where ItemTimeStamp = '${time}' order by ItemTimeStamp, ItemID`, callback);
};

exports.getFilterValue = (table, names, time, callback) => {
	var nameStr = _.join(names, `' or ItemID = '`);
	conn.query(`SELECT * from ${table} where (ItemID = '${nameStr}') and ItemTimeStamp = '${time}'  order by ItemTimeStamp, ItemID`, callback);
}

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

'use strict'

import _ from 'lodash';
import conn from './index';

exports.select = (table, name, timestamp) => {
	return conn.query(`SELECT * from '${table}' where name = '${name}' and timestamp = '${timestamp}'`, function(err, rows, fields) {
		if (err)
			throw err;
	});
};

exports.select2 = () => {
	console.log(1);
	var query = conn.query(`SELECT * from fic001`, function(err, rows, fields) {
		if (err)
			throw err;
	});
	console.log(2);
	console.log(query);
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
	var ItemID =  controller.ItemID;
	var ItemCurrentValue =  controller.ItemCurrentValue;
	var ItemTimeStamp =  controller.ItemTimeStamp;

	conn.query(`Insert into fic001 (ItemID, ItemCurrentValue, ItemTimeStamp) Values ('${ItemID}', '${ItemCurrentValue}', '${ItemTimeStamp}')`, function(err, rows, fields) {
		if (err)
			throw err;
	});
};
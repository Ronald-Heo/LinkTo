'use strict'

const _ = require('lodash');
const conn = require('./index').conn;

exports.select = (name, timestamp) => {
	conn.query(`SELECT * from controller where name = '${name}' and timestamp = '${timestamp}'`, function(err, rows, fields) {
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
	var ItemID =  controller.ItemID;
	var ItemCurrentValue =  controller.ItemCurrentValue;
	var ItemTimeStamp =  controller.ItemTimeStamp;

	// console.log(controller);

	conn.query(`Insert into fic001 (ItemID, ItemCurrentValue, ItemTimeStamp) Values ('${ItemID}', '${ItemCurrentValue}', '${ItemTimeStamp}')`, function(err, rows, fields) {
		if (err)
			throw err;
	});
};
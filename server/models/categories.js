'use strict'

const _ = require('lodash');
var conn = require('./index').conn;
conn = conn.conn ? conn.conn : conn;

exports.getCategories = (callback) => {
	conn.query('SELECT ItemID FROM unit group by ItemID;', callback);
};

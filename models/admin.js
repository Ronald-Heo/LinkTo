'use strict'

const conn = require('./').conn;

exports.login = (id, pw) => {
	conn.query(`SELECT * from user where id = '${id}' and pw = '${pw}'`, function(err, rows, fields) {
		if (err)
			throw err;

		console.log('The solution is: ', rows[0].solution);
		return rows[0];
	});
};

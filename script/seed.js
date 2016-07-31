'use strict'

const controller = require('../server/models/controllers');
const csv = require('csv-parser');
const fs = require('fs');

const stream = csv({
	separator: ';', // specify optional cell separator
	quote: '"',     // specify optional quote character
	escape: '"',    // specify optional escape character (defaults to quote value)
	newline: '\r\n',  // specify a newline character
	strict: true    // require column length match headers length
});

fs.createReadStream('./script/sample_dataset.csv')
	.pipe(stream)
	.on('data', function(data) {
		controller.insert(data);
	});

fs.createReadStream('./script/FIC002.csv')
	.pipe(stream)
	.on('data', function(data) {
		controller.insert(data);
	});

fs.createReadStream('./script/PIC002.csv')
	.pipe(stream)
	.on('data', function(data) {
		controller.insert(data);
	});

fs.createReadStream('./script/TIC002.csv')
	.pipe(stream)
	.on('data', function(data) {
		controller.insert(data);
	});

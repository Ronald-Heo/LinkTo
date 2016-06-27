'use strict'

const controller = require('../models/controller');
const csv = require('csv-parser');
const fs = require('fs');

const stream = csv({
	separator: ';', // specify optional cell separator
	quote: '"',     // specify optional quote character
	escape: '"',    // specify optional escape character (defaults to quote value)
	newline: '\r\n',  // specify a newline character
	strict: true    // require column length match headers length
})

fs.createReadStream('source/scripts/sample_dataset.csv')
	.pipe(stream)
	.on('data', function(data) {
		console.log(data);
		controller.insert(data);
	});
'use strict';

const Redirect = require('../common/responses').Redirect;
const Unauthorized = require('../common/responses').Unauthorized;

exports.needsAdmin = (req, res, next) => {
	if (req.session.admin) {
		next();
	} else {
		next(new Unauthorized('needs.admin'));
	}
};

exports.needsAdminLogin = (req, res, next) => {
	if (req.session.admin) {
		next();
	} else {
		next(new Redirect('/users'));
	}
};

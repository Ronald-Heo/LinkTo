'use strict';

const _ = require('lodash');
const acl = require('../../middlewares/acl');
const Admin = require('../../models/admin');
const BadRequest = require('../../common/responses').BadRequest;
const NotFound = require('../../common/responses').NotFound;
const Router = require('../router');
const Unauthorized = require('../../common/responses').Unauthorized;

const router = Router.createRouter();

router.post('/login', req => {
	let username = req.body.username;
	let password = req.body.password;

	return Admin
		.login(username, password)
		.then(instance => {
			if (!instance) {
				throw new Unauthorized('no.admin');
			}
			req.session.admin = instance;
		});
});

module.exports = router.expressRouter();

'use strict';

const adminAPI = require('./admin');
const controllerAPI = require('./controller');

const Router = require('express').Router;

const router = new Router();

router.use('/admin', adminAPI);
router.use('/controller', controllerAPI);

module.exports = router;

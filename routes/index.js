'use strict';

const acl = require('../middleweares/acl');
const template = require('../common/template');
const Router = require('./router');

const router = Router.createRouter();

router.get('/', [acl.needsAdminLogin], () => {
  return template.render('index', { title: 'LinkTo' });
});

router.get('/admin', [acl.needsAdminLogin], () => {
  return template.render('admin', { title: 'Admin' });
});

module.exports = router.expressRouter();

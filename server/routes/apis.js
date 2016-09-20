'use strict';

import _ from 'lodash';
import controllers from './controllers/tables';
import express from 'express';
import users from './users';
import categories from './categories';

const router = express.Router();

router.use('/controllers', controllers);
router.use('/users', users);
router.use('/categories', categories);

router.use((req, res, next) => {
    next();
});

export default router;

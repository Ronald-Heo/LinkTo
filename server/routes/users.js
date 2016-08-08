'use strict';

import express from 'express';
import config from '../config';

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/me', (req, res) => {
    // TODO get Me Object
    console.log('get: me');
    if (req.session.user) {
    	res.status(200);
        res.send('success');
    } else {
    	res.status(404);
        res.send('not logined');
    }
});

router.post('/me', (req, res) => {
    // TODO Login
    if(req.body.id === config.admin.id
    	&& req.body.pw === config.admin.pw) {
    	req.session.user = 'admin';

        res.status(200);
        res.send('success');
    } else {
    	req.session.user = '';
        res.clearCookie('linkto');

        res.status(404);
        res.send('not logined');
    }
});

router.delete('me', (req, res) => {
	// TODO Logout
	console.log('delete: me');
    req.session.destory();
    res.clearCookie('linkto');
    res.send('success');
});

export default router;

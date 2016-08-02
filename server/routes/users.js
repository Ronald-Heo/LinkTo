'use strict';

import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.post('/login', (req, res) => {
    // TODO Login
});

export default router;

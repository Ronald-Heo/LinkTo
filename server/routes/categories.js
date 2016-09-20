'use strict';

import _ from 'lodash';
import express from 'express';
import categories from '../models/categories';
import config from '../config';

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/category1', (req, res) => {
    categories.getCategories(function(err, result) {
        res.send(_.compact(_.uniq(_.map(result, (item) => {
            var value = _.split(item.ItemID, '.', 3);
            return value[0];        
        }))));
    });
});

router.get('/category2', (req, res) => {
    categories.getCategories(function(err, result) {
        res.send(_.compact(_.uniq(_.map(result, (item) => {
            var value = _.split(item.ItemID, '.', 3);
            if(value[0] === req.query.category1)
                return value[1];
            else
                return;
        }))));
    });
});

router.get('/category3', (req, res) => {
    categories.getCategories(function(err, result) {
        res.send(_.compact(_.uniq(_.map(result, (item) => {
            var value = _.split(item.ItemID, '.', 3);
            if(value[0] === req.query.category1
                && value[1] === req.query.category2)
                return value[2];
            else
                return;
        }))));
    });
});

export default router;

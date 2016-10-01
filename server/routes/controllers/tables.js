'use strict';

import _ from 'lodash';
import controllers from '../../models/controllers';
import express from 'express';
import moment from 'moment';

const router = express.Router();
 
router.use((req, res, next) => {
    if(req.session.user) {
        next();
    } else {
        res.status(404);
        res.send('not logined');
    }
});

/** 테이블 종류 받으옴 */
router.get('/getTableGroup', (req, res) => {
    controllers.getTableGroup(function(err, result) {
		res.send(_.map(result, 'Tables_in_linkto'));
	});
});

/** 시간 필터링 */
router.get('/getControllerValues', (req, res) => {
    // locale time, before 9 hours
    var startDate = moment(new Date(req.query.startDate)).subtract(moment.duration(9, 'h')).format('YYYY-MM-DD HH:mm:ss');
    var endDate = moment(new Date(req.query.endDate)).subtract(moment.duration(9, 'h')).format('YYYY-MM-DD HH:mm:ss');

    var category1 = req.query.category1;
    var category2 = req.query.category2;
    var category3 = req.query.category3;

    controllers.getControllerValues('unit', category1, category2, category3, startDate, endDate, function(err, result) {
        res.send(result);
    }); 
});

/** 현재 시간 데이터 */
router.get('/getControllerValue', (req, res) => {
    var now = moment(new Date()).add(moment.duration(1, 's')).format('YYYY-MM-DD HH:mm:ss');
    
    controllers.getControllerValue(req.query.table, now, function(err, result) {
        res.send(result);
    }); 
});


router.post('/getFilterValue', (req, res) => {
    var itemIds = _.map(req.body, (id) => {
        return id.split('-').join('.');
    });
    
    controllers.getFilterValue('unit', itemIds, req.query.time, function(err, result) {
        res.send(result);
    }); 
});

/** 기본이 되는 API  */
router.get('/controller', (req, res) => {
    console.log(req.query);
	controllers.getControllerData(req.query.table, function(err, result) {
            // 필요한 데이터로 걸러냄 
            // res.send(_.groupBy(result, 'ItemID'));
            res.send(result);
        });
});

export default router;

'use strict';

import _ from 'lodash';
import controllers from '../../models/controllers';
import express from 'express';
import moment from 'moment';

const router = express.Router();
 
router.use((req, res, next) => {
    next(); // TODO 테스트용
    // if(req.session.user) {
    //     next();
    // } else {
    //     res.status(404);
    //     res.send('not logined');
    // }
});

/** 테이블 종류 받으옴 */
router.get('/getTableGroup', (req, res) => {
    controllers.getTableGroup(function(err, result) {
		res.send(_.map(result, 'Tables_in_linkto'));
	});
});

/** 시간 필터링 */
router.get('/getControllerValues', (req, res) => {
    var startDate = moment(new Date(req.query.startDate)).subtract(moment.duration(9, 'h')).format('YYYY-MM-DD HH:mm:ss');
    var endDate = moment(new Date(req.query.endDate)).subtract(moment.duration(9, 'h')).format('YYYY-MM-DD HH:mm:ss');

    console.log(req.query.startDate);
    console.log(startDate);

    controllers.getControllerValues(req.query.table, startDate, endDate, function(err, result) {
        res.send(result);
    }); 
});

var temp = 1;

/** 현재 시간 데이터 */
router.get('/getControllerValue', (req, res) => {
    var now = moment(new Date(2016, 7, 16, 10, 20, 17)).add(moment.duration(temp, 's')).format('YYYY-MM-DD HH:mm:ss');
    
    console.log(now);
    temp = temp+1;

    controllers.getControllerValue(req.query.table, now, function(err, result) {
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

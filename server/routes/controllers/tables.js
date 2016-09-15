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
    var startDate = moment(new Date(req.query.startDate)).format('YYYY-MM-DD HH:mm:ss');
    var endDate = moment(new Date(req.query.endDate)).format('YYYY-MM-DD HH:mm:ss');

   controllers.getControllerValues(req.query.table, startDate, endDate, function(err, result) {
        res.send(result);
    }); 
});

/** 현재 시간 데이터 */
router.get('/getControllerValue', (req, res) => {
    var now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    now = '2016-08-16 10:09:17';    // TODO 테스트중

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

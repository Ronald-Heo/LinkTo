'use strict';

import _ from 'lodash';
import controllers from '../../models/controllers';
import express from 'express';

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

router.get('/getTableGroup', (req, res) => {
    controllers.getTableGroup(function(err, result) {
		res.send(_.map(result, 'Tables_in_linkto'));
	});
});

router.get('/controller', (req, res) => {

	if (req.query.table) {
		controllers.getControllerData(req.query.table, function(err, result) {
            // 필요한 데이터로 걸러냄 
            // res.send(_.groupBy(result, 'ItemID'));
            res.send(result);
        });
	} else {
        res.status(400);
        res.send('no selected table');
    }
});

export default router;

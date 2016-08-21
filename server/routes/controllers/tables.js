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
            // res.send(_.groupBy(result, 'ItemTimeStamp'));
            res.send(result);
        });
	} else {
        res.status(400);
        res.send('no selected table');
    }
});

router.get('/testData', (req, res) => {
    var data = "date    New York    San Francisco   Austin\n" + 
"20111001    63.4    62.7    72.2\n" + 
"20111002    58.0    59.9    67.7\n" + 
"20111003    53.3    59.1    69.4";

    res.send(data);
})

export default router;

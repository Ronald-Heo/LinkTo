'use strict';

import _ from 'lodash';
import controllers from '../../models/controllers';
import express from 'express';

const router = express.Router();
 
router.use((req, res, next) => {
    if(req.session.user) {
        next();
    } else {
        res.status(404);
        res.send('not logined');
    }
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
            result = _.map(result, (category) => {
                category.ItemID = category.ItemID.split('.')[1].replace('\n"', '').replace('\"', ''); // TODO 잘못된 데이터가 듫어가 있어서 임의로 삽입한 코드
                return category;
            });
            
            res.send(_.groupBy(result, 'ItemTimeStamp'));
        });
	} else {
        controllers.getControllerData('fic001', function(err, result) {
            // 필요한 데이터로 걸러냄 
            result = _.map(result, (category) => {
                category.ItemID = category.ItemID.split('.')[1].replace('\n"', '').replace('\"', ''); // TODO 잘못된 데이터가 듫어가 있어서 임의로 삽입한 코드
                return category;
            });
            
            // res.send(_.groupBy(result, 'ItemID'));
            console.log(result);
            res.send(result);
        });
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

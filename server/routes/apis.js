'use strict';

import _ from 'lodash';
import express from 'express';
import controllers from '../models/controllers';

const router = express.Router();

router.use((req, res, next) => {
    // console.log('Time: ', Date.now().toString());
    next();
});
 
router.get('/', (req, res) => {
    res.send(controllers.select2());
});
 
router.get('/getNameGroup', (req, res) => {
    controllers.getNameGroup(function(err, result) {
        
        // 필요한 데이터로 걸러냄
        result = _.map(result, (category) => {
            category.ItemID = category.ItemID.split('.')[0].replace('\n"', ''); // TODO 잘못된 데이터가 듫어가 있어서 임의로 삽입한 코드
            return category;
        });

        // 중복 삭제
        result = result.reduce(function(a,b){
            if (a.indexOf(b.ItemID) < 0 ) 
                a.push(b.ItemID);
            return a;
          },[]);

		res.send(result);
	});
});

router.get('/controller', (req, res) => {
    controllers.getControllerData(function(err, result) {
        
        // 필요한 데이터로 걸러냄 
        result = _.map(result, (category) => {
            category.ItemID = category.ItemID.split('.')[1].replace('\n"', '').replace('\"', ''); // TODO 잘못된 데이터가 듫어가 있어서 임의로 삽입한 코드
            return category;
        });

        console.log(result.ItemID);
        // console.log(_.groupBy(result, 'ItemID'););

        res.send(_.groupBy(result, 'ItemID'));
    });
});

export default router;

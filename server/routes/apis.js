import express from 'express';
import controllers from '../models/controllers';

const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now().toString());
    next();
});
 
router.get('/', (req, res) => {
	console.log(controllers.select2());
    res.send('api');
});

router.get('/getFic001', (req, res) => {
    res.send(controllers.select2().toJson());
});

router.get('/noticecategories', (req, res) => {
    res.send('api');
});

router.get('/read/:id', (req, res) => {
	controllers.select(req.params.id, 'name', 'timestamp');
    res.send('You are reading api ' + req.params.id);
});
 
export default router;

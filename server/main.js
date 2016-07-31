import express from 'express';
 
const app = express();
 
app.use('/', express.static(__dirname + '/../dist'));
 
app.get('/hello', (req, res) => {
    return res.send('Can you hear me?');
});
 
import articles from './routes/articles';
import apis from './routes/apis';
 
app.use('/articles', articles);
app.use('/apis', apis);

// app.get('*', function(req, res){
//   res.send('what???', 404);
// });

const server = app.listen(3001, () => {
    console.log('Express listening on port 3001');
});

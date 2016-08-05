import express from 'express';
 
const app = express();
 
app.use('/', express.static(__dirname + '/../dist'));
 
app.get('/hello', (req, res) => {
    return res.send('Can you hear me?');
});
 
import apis from './routes/apis';
import users from './routes/users';

app.use('/apis', apis);
app.use('/users', users);

const server = app.listen(3001, () => {
    console.log('Express listening on port 3001');
});

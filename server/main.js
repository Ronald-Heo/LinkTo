'use strict';

import apis from './routes/apis';
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/../dist'));
 
app.use(session({
  secret: 'linkto', // 비밀키
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
  }
}));

app.use('/apis', apis);

const server = app.listen(3001, () => {
    console.log('Express listening on port 3001');
});

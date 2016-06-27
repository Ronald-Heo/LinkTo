'use strict';

const Session = require('../models/session');

exports.ensureUserSession = (req, res, next) => {
  if (req.session.userSession) {
    next();
  } else {
    Session
      .create({})
      .then(session => {
        req.session.userSession = session.id;
        next();
      });
  }
};

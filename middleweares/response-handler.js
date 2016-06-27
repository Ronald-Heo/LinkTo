'use strict';

module.exports = (resObj, req, res, next) => {
  if (!resObj.status) {
    // malformed response object, maybe an error
    next(resObj);
    return;
  }

  res.set(resObj.header);
  res.status(resObj.status).json({
    message: resObj.message
  });
};

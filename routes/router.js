'use strict';

const _ = require('lodash');
const Router = require('express').Router;

let RouterPrototype = {
  expressRouter() {
    return this._router;
  },
  use() {
    return this._router.use.apply(this._router, arguments);
  }
};

let handleData = res => {
  return data => {
    if (data && (data.status || data.isTemplate)) {
      throw data;
    }

    let jsonRes = {ok: true};
    if (data) {
      jsonRes.data = data;
    }

    res.json(jsonRes);
  };
};

let appendHandler = (proto, method) => {
  proto[method] = function (path, middlewares, handler) {
    if (_.isFunction(middlewares)) {
      // no middleware, middlewares may refer to a handler
      handler = middlewares;
      middlewares = [];
    }

    middlewares.forEach(middleware => {
      this._router[method](path, middleware);
    });

    this._router[method](path, (req, res, next) => {
      let response = handler(req);

      if (response && _.isFunction(response.then)) {
        // if it's promise, handle as a promise
        response.then(handleData(res), next);
      } else {
        // if it's not, handle as a sequential function call
        handleData(res)(response);
      }
    });
  };
};

appendHandler(RouterPrototype, 'get');
appendHandler(RouterPrototype, 'post');
appendHandler(RouterPrototype, 'put');
appendHandler(RouterPrototype, 'delete');
appendHandler(RouterPrototype, 'head');
appendHandler(RouterPrototype, 'patch');

exports.createRouter = () => {
  let router = Object.create(RouterPrototype);
  router._router = new Router();
  return router;
};

exports.destroySession = req => {
  return new Promise(function (resolve, reject) {
    req.session.destroy(err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

'use strict';

import angular from 'angular';

const services = angular.module('services', []);

services.factory('apiService', () => {
  const apiService = {
    host: 'localhost',
    urlFormatter(object, paths) {
      paths = _.isArray(paths) ? paths : [paths];

      _.forEach(paths, (path) => {
        if (!_.has(object, path)) return;

        _.set(object, path, `${this.host}${_.get(object, path)}`);
      });
    }
  };

  return apiService;
});

export default services;

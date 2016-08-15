'use strict';

import angular from 'angular';
import d3 from 'd3';

const services = angular.module('services', [
  'd3'
]);

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

services.factory('d3Service', [function(){
  var d3;
  return d3;
}];

export default services;

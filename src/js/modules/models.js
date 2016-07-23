'use strict';

import angular from 'angular';
import angularResource from 'angular-resource';

const models = angular.module('models', [
	angularResource
]);

models.factory('NoticeCategoriesModel', ($resource, apiService) => {
  const NoticeCategories = $resource(`${apiService.host}/apis/noticecategories`);

  return NoticeCategories;
});

export default models;

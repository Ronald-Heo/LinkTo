'use struct';

import angular from 'angular';
import controllers from './modules/controllers.js';
import models from './modules/models.js';
import routes from './modules/routes.js';
import services from './modules/services.js';
import templates from './modules/templates.js';

const app = angular.module('app', [
	controllers.name,
	models.name,
	routes.name,
	services.name,
	templates.name
]);

app.run(['$rootScope', ($rootScope) => {
	$rootScope.defaultPageTitle = 'LinkTo';
}]);
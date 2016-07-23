'use strict';

import angular from 'angular';
import angularUiRouterTitle from 'angular-ui-router-title';
import angularUiRouter from 'angular-ui-router';

const routes = angular.module('routes', [
	'ui.router.title',
	angularUiRouter
]);

routes.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
	$urlRouterProvider.otherwise("/");

	$stateProvider
	    .state('intro', {
	      url: '/',
	      resolve: {
	        
	      },
		  templateUrl: 'intro.html',
		  controller: 'HeaderController as vm'
	    });

	$stateProvider
	    .state('dashboard', {
	      url: '/dashboard',
	      resolve: {
	        
	      },
		  templateUrl: 'dashboard.html',
		  controller: 'DashboardController as vm'
	    });

	$stateProvider
	    .state('404', {
	      url: '/{path:.*}',
	      resolve: {
	        page404($q) {
	          alert('페이지를 찾을 수 없습니다.'); // TODO: alert

	          $q.reject();
	        },
	        $title: () => '페이지를 찾을 수 없습니다.'
	      }
	    });
}]);

export default routes;

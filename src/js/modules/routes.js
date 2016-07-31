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
	      	option() {
	      		return 'zzz';
	      	},
	      	data() {
	      		return 'test';	
	      	}
	      },
		  templateUrl: 'dashboard.html',
		  controller: 'DashboardController as vm'
	    })
	    .state('sample', {
	      url: '/sample',
	      resolve: {
	        
	      },
		  templateUrl: 'sample.html',
		  controller: 'SampleController as vm'
	    })
	    .state('account', {
	      url: '/account',
	      resolve: {
	        
	      },
		  templateUrl: 'account.html',
		  controller: 'AccountController as vm'
	    })
	    .state('dblist', {
	      url: '/dblist',
	      resolve: {
	        
	      },
		  templateUrl: 'dblist.html',
		  controller: 'DBListController as vm'
	    })
	    .state('modelling', {
	      url: '/modelling',
	      resolve: {
	        
	      },
		  templateUrl: 'modelling.html'
	    })
	    .state('assessment', {
	      url: '/assessment',
	      resolve: {
	        
	      },
		  templateUrl: 'assessment.html'
	    })
	    .state('setting', {
	      url: '/setting',
	      resolve: {
	        
	      },
		  templateUrl: 'setting.html'
	    })
	    .state('help', {
	      url: '/help',
	      resolve: {
	        
	      },
		  templateUrl: 'help.html'
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

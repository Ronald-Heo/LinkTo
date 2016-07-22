'use strict';

import angular from 'angular';

const controllers = angular.module('controllers', []);

controllers.controller('HeaderController', function(){
	const vm = this;

	console.log(1);
});

export default controllers;

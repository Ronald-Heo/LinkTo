'use strict';

import angular from 'angular';
import d3 from 'd3';

const directives = angular.module('directives', [
	'd3'
]);

directives.directive('barChart', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      // directive code
    }
  }]);

export default directives;

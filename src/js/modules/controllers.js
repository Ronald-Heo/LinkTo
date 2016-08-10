'use strict';

import _ from 'lodash';
import angular from 'angular';
import config from '../../config';
import FileSaver from 'angular-file-saver'

const controllers = angular.module('controllers', [
    FileSaver
]);

var isLogined = ($q, $state, $http) => {
    $http.get(`${config.apiServer}/apis/users/me`)
        .success((data, status, headers, config) => {
            return;
        })
        .error((data, status, headers, config) => {
            $state.go('login');
            $q.reject();
        });
}

controllers.controller('HeaderController', function(){
    const vm = this;

});

controllers.controller('SampleController', function(){
    const vm = this;

});

controllers.controller('AccountController', function(){
    const vm = this;
});

controllers.controller('DBListController', function(){
    const vm = this;

        vm.margin = {top: 20, right: 20, bottom: 30, left: 300},
        width = 1260 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        vm.x = d3.scale.linear()
            .domain([-width / 2, width / 2])
            .range([0, width]);

        vm.y = d3.scale.linear()
            .domain([-height / 2, height / 2])
            .range([height, 0]);

        vm.xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickSize(-height);

        vm.yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5)
            .tickSize(-width);

        vm.zoom = d3.behavior.zoom()
            .x(x)
            .y(y)
            .scaleExtent([1, 32])
            .on("zoom", zoomed);

        vm.svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(zoom);

        svg.append("rect")
            .attr("width", width)
            .attr("height", height);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        vm.zoomed = () => {
          svg.select(".x.axis").call(xAxis);
          svg.select(".y.axis").call(yAxis);
        }

        vm.test = 3;
        console.log(vm.test);



});

controllers.controller('DashboardController', ['$q', '$state', '$http', 'FileSaver', function($q, $state, $http, FileSaver){
    isLogined($q, $state, $http);
	const vm = this;

    vm.category = [];
    vm.playList;    // 재생 여부

    $http.get(`${config.apiServer}/apis/controllers/getTableGroup`)
        .success((data, status, headers, config) => {
            vm.category = data;
        })
        .error((data, status, headers, config) => {
            
        });

    /*데이터 불러오기*/
    $http.get(`${config.apiServer}/apis/controllers/getControllerData`)
        .success((data, status, headers, config) => {
            vm.tagdata = data;
        })
        .error((data, status, headers, config) => {
            
        });


    vm.searchKeyword = "none";


    vm.play = () => {
        console.log('play');
        vm.playList = setInterval(function() {
                console.log('aaa');
            }, 3000);
    };

    vm.stop = () => {
        console.log('stop');
        if (vm.playList)
            clearInterval(vm.playList);
    }

    vm.export = () => {
        if (!vm.graph.data) {
            confirm('출력할 데이터가 없습니다.');
            return;
        }
        console.log('export');
        // TODO Export
        var defaultFileName = 'export.csv';
        var type = 'application/vnd.ms-excel;charset=charset=utf-8';
        var blob = new Blob(['a,b,c,d\n1,2,3,4\nq,,e,r'], { type: type });
        FileSaver.saveAs(blob, defaultFileName);
    }

    vm.import = () => {
        console.log('import');
        // TODO Import
    }

    vm.callTable = () => {
        console.log(1);

    };
        $http.get("http://localhost:3001/apis/getTableName")
            .then((response) => {
                vm.category = response.data;
            });

    vm.getController = () => {
        $http.get(`${config.apiServer}/apis/controllers/controller?table=${vm.selectedCategory}`)
            .then((response) => {
                console.log(response);

                if (!response.data.SP) {
                    response.data.SP = {}
                }
                if (!response.data.CO) {
                    response.data.CO = {}
                }
                if (!response.data.PV) {
                    response.data.PV = {}
                }
                if (!response.data.P) {
                    response.data.P = {}
                }
                if (!response.data.I) {
                    response.data.I = {}
                }
                if (!response.data.D) {
                    response.data.D = {}
                }
            });  
    };




}]);

controllers.controller('LoginController', ['$http', '$state', function($http, $state){
    const vm = this;

    vm.form = {
        id: '',
        pw: ''
    }

    vm.login = () => {
        $http.post(`${config.apiServer}/apis/users/me`, vm.form)
            .success(function(data, status, headers, config) {
                $state.go('dashboard');
            })
            .error(function(data, status, headers, config) {
                alert('잘못된 계정입니다.');
                $state.reload();
            });
    };

    vm.logout = () => {
        $http.delete(`${config.apiServer}/apis/users/me`)
            .success(function(data, status, headers, config) {
                $state.go('login');
            })
            .error(function(data, status, headers, config) {
                $state.reload();
            });
    }
}]);

export default controllers;

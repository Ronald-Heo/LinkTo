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
        
        var svg = d3.select("svg");

        console.log(svg.attr("width"));

        var margin = {top: 20, right: 80, bottom: 30, left: 50},
        width = 850,
        height = 550,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        
      var parseTime = d3.timeParse("%Y%m%d");

      var x = d3.scaleTime().range([0, width]),
          y = d3.scaleLinear().range([height, 0]),
          z = d3.scaleOrdinal(d3.schemeCategory10);
      
      var line = d3.line()
          .curve(d3.curveBasis)
          .x(function(d) { 
            console.log(d);
            return x(d.ItemTimeStamp); 
          })
          .y(function(d) { 
            console.log(d);
            return y(d.ItemCurrentValue); 
          });

          d3.tsv("apis/controllers/controller", type, function(error, data) {
            if (error) throw error;

            console.log(data);
            var cities = data.columns.slice(1).map(function(id) {
              return {
                id: id,
                values: data.map(function(d) {
                  return {date: d.date, temperature: d[id]};
                })
              };
            });
            console.log(cities);
          x.domain(d3.extent(data, function(d) { 
            return d.date; 
          }));

          y.domain([
            d3.min(cities, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
            d3.max(cities, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
          ]);

          z.domain(cities.map(function(c) { return c.id; }));

          g.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));

          g.append("g")
              .attr("class", "axis axis--y")
              .call(d3.axisLeft(y))
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", "0.71em")
              .attr("fill", "#000")
              .text("Temperature, ºF");

          var city = g.selectAll(".city")
            .data(cities)
            .enter().append("g")
              .attr("class", "city");

          city.append("path")
              .attr("class", "line")
              .attr("d", function(d) { 
                console.log(d);
                return line(d.values); 
              })
              .style("stroke", function(d) { 
                return z(d.id); 
              });

          city.append("text")
              .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
              .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
              .attr("x", 3)
              .attr("dy", "0.35em")
              .style("font", "10px sans-serif")
              .text(function(d) { return d.id; });
        });

        function type(d, _, columns) {
          d.date = parseTime(d.date);
          for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
          return d;
        }
    }

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

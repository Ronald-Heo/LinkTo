'use strict';

import _ from 'lodash';
import angular from 'angular';
import config from '../../config';
import FileSaver from 'angular-file-saver';
import moment from 'moment';

const controllers = angular.module('controllers', [
    FileSaver
]);

var isLogined = ($q, $state, $http) => {
    $http.get(`${config.apiServer}/apis/users/me`)
        .success((data, status, headers, config) => {
            return;
        })
        .error((data, status, headers, config) => {
            return; // TODO 테스트용 
            // $state.go('login');
            // $q.reject();
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
  
  {
    vm.category = [];
    vm.playList;    // 재생 여부

    vm.controllers = [];

    vm.startDate = new Date();
    vm.startDate.setDate(vm.startDate.getDate() - 1);
    vm.endDate = new Date();
  }

    $http.get(`${config.apiServer}/apis/controllers/getTableGroup`)
        .success((data, status, headers, config) => {
            vm.category = data;
            vm.selectedCategory = vm.category[0];
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
        
      $http.get(`${config.apiServer}/apis/controllers/getControllerValues?table=${vm.selectedCategory}&startDate=${vm.startDate}&endDate=${vm.endDate}`)
      // $http.get(`${config.apiServer}/apis/controllers/controller?table=unit`)
        .success((data, status, headers, config) => {

            data = _.map(data, (info) => {
              info.ItemTimeStamp = moment(new Date(info.ItemTimeStamp)).format('YYYY-MM-DD HH:mm:ss');
              info.ItemCurrentValue = +info.ItemCurrentValue;
              return info;
            });

            var color = d3.scale.category10();

            var margin = {top: 20, right: 20, bottom: 30, left: 50},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var formatDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

            var x = d3.time.scale()
                .range([0, width]);

            var y = d3.scale.linear()
                .range([height, 0 - height]);

            // var z = d3.scaleOrdinal(d3.schemeCategory10);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");
            
            var line = d3.svg.line()
                .x(function(d) {
                  return x(formatDate(d.ItemTimeStamp)); 
                })
                .y(function(d) { 
                  return y(d.ItemCurrentValue); 
                });

            // Define the div for the tooltip
            var div = d3.select("body").append("div") 
                .attr("class", "tooltip")       
                .style("opacity", 0);

            var svg = d3.select("canvers").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            x.domain(d3.extent(data, 
              function(d) { 
                return formatDate(d.ItemTimeStamp);
              })
            );

            y.domain(d3.extent(data, 
              function(d) {
               return d.ItemCurrentValue; 
             }));

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
              .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Value");

            // Nest the entries by symbol
            var dataNest = d3.nest()
                .key(function(d) {return d.ItemID;})
                .entries(data);

                vm.controllers = [];

            // Loop through each symbol / key
            dataNest.forEach(function(d) {
              vm.controllers.push(d);
              
                svg.append("path")
                    // .datum(target)
                    .data(d.values)
                    .attr("class", "line")
                    .style("stroke", function() {
                        return d.color = color(d.key); 
                    })
                    .attr("d", line(d.values))
                    .on("mouseover", function(d) {    

                      div.transition()    
                          .duration(200)
                          .style("opacity", .9);    
                      div .html((d.ItemTimeStamp) + "<br/>"  + d.ItemCurrentValue)  
                          .style("left", (d3.event.pageX) + "px")   
                          .style("top", (d3.event.pageY - 28) + "px");  
                    })          
                    .on("mouseout", function(d) {   
                      console.log(d);
                        div.transition()    
                            .duration(500)    
                            .style("opacity", 0); 
                    });
            });
        })
        .error((data, status, headers, config) => {
            console.log('err');
        });
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

'use strict';

import _ from 'lodash';
import angular from 'angular';
import angularNvd3 from 'angular-nvd3';
import d3 from 'd3';
import nvd3 from 'nvd3';


const controllers = angular.module('controllers', [
	'nvd3'
]);

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

controllers.controller('DashboardController', ['$http', 'option', function($http, option){
	const vm = this;

    vm.category = [];
    vm.graph = {
        options: {},
        data: {}
    };

    vm.call = () => {
        $http.get("http://localhost:3001/apis/getNameGroup")
            .then((response) => {
                vm.category = response.data;
            });
    };

    vm.getController = () => {
        $http.get("http://localhost:3001/apis/controller")
            .then((response) => {
                vm.graph.data = [
                    {
                        values: response.data.SP,
                        key: 'SP',
                        color: '#ff0000'
                    },
                    {
                        values: response.data.CO,
                        key: 'CO',
                        color: '#007f00'
                    },
                    {
                        values: response.data.PV,
                        key: 'PV',
                        color: '#00000e'
                    },
                    {
                        values: response.data.P,
                        key: 'P',
                        color: '#ffff0e'
                    },
                    {
                        values: response.data.I,
                        key: 'I',
                        color: '#007f0e'
                    },
                    {
                        values: response.data.D,
                        key: 'D',
                        color: '#ff000e'
                    },
                ];
            });  
    };

    // TODO 데이터 옵션 클릭시 변경
    // vm.changeOptions = () => {
    //     vm.options.sp;
    //     vm.options.co;
    //     vm.options.pv;
    //     vm.options.p;
    //     vm.options.i;
    //     vm.options.d;
    // };

	vm.graph.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ 
                    //console.log(d3.time.format('%Y-%m-%d').parse(d.ItemTimeStamp));
                    // return d.ItemTimeStamp; 
                    if (d.ItemTimeStamp) {
                        var date = new Date(d.ItemTimeStamp);
                        // console.log(date.getTime());
                        return date.getTime() / 1000;
                    } else {
                        return d.x;
                    }
                },
                y: function(d){ 
                    // console.log(d);
                    if (d.ItemCurrentValue) {
                        return d.ItemCurrentValue;
                    } else {
                        return d.y;
                    }
                    // return d.ItemCurrentValue; 
                },
                useInteractiveGuideline: false, // 여러개 한꺼본에 보이게 하는 옵션
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Time'
                    // tickFormat: function(d) { 
                    //     return d3.time.format('%Y-%m-%d')(new Date(d)); 
                    // }
                },
                yAxis: {
                    axisLabel: 'Value',
                    // tickFormat: function(d){
                    //     return d3.format('.05f')(d);
                    // },
                    axisLabelDistance: -5
                },
                callback: function(chart){
                    // 그래프 다 그린다음에 호출되는 Callback
                    console.log("lineChart callback 완료");
                }
            },
            title: {
                enable: true,
                text: 'LinkTo Data',
                css: {
                    'text-align': 'center'
                }
            },
            subtitle: {
                enable: true,
                text: '현재 선택된 옵션을 적용시킨 데이터 결과값',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            },
        };

        vm.graph.data = sinAndCos();

        /*Random Data Generator */
        function sinAndCos() {
            var sin = [],sin2 = [],
                cos = [];

            //Data is represented as an array of {x,y} pairs.
            for (var i = 0; i < 100; i++) {
                sin.push({x: i, y: Math.sin(i/10)});
                sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
                cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
            }

            //Line chart data should be sent as an array of series objects.
            return [
                {
                    values: sin,      //values - represents the array of {x,y} data points
                    key: 'Sine Wave', //key  - the name of the series.
                    color: '#ff7f0e'  //color - optional: choose your own line color.
                },
                {
                    values: cos,
                    key: 'Cosine Wave',
                    color: '#2ca02c'
                },
                {
                    values: sin2,
                    key: 'Another sine wave',
                    color: '#7777ff',
                    area: true      //area - set to true if you want this line to turn into a filled area chart.
                }
            ];
        };
}]);

export default controllers;

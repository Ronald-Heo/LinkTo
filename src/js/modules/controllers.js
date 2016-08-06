'use strict';

import _ from 'lodash';
import angular from 'angular';
import angularNvd3 from 'angular-nvd3';
import config from '../../config';
import d3 from 'd3';
import FileSaver from 'angular-file-saver'
import nvd3 from 'nvd3';

const controllers = angular.module('controllers', [
	'nvd3',
    FileSaver
]);

var isLogined = ($q, $state, $http) => {
    $http.get(`${config.apiServer}/apis/users/me`)
        .success((data, status, headers, config) => {
            console.log(response);
            return;
        })
        .error((data, status, headers, config) => {
            // never reached even for 400/500 status codes
            console.log(status);
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
    vm.graph = {
        options: {},
        data: {}
    };

    vm.playList;    // 재생 여부

    $http.get(`${config.apiServer}/apis/controllers/getTableGroup`)
                .then((response) => {
                    vm.category = response.data;
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
        // var key = [];
        
        // _.map(vm.graph.data, (controller) => {

        // });

        console.log(vm.graph.data);

        var blob = new Blob(['a,b,c,d\n1,2,3,4\nq,,e,r'], { type: type });
        FileSaver.saveAs(blob, defaultFileName);
    }

    vm.import = () => {
        console.log('import');
        // TODO Import
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
                    //var date = new Date(d.ItemTimeStamp);
                    return d.ItemTimeStamp;
                },
                y: function(d){ 
                    return d.ItemCurrentValue;
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
                    //     return d3.time.format('%B %Y')(new Date(d)); 
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
            zoom: {
                //NOTE: All attributes below are optional
                enabled: true,
                scale: 1,
                scaleExtent: [1, 10],
                translate: [0, 0],
                useFixedDomain: false,
                useNiceScale: false,
                horizontalOff: false,
                verticalOff: false,
                zoomed: function(xDomain, yDomain) {
                    var domains = {x1: 0, x2: 0, y1: 1, y2: 1};
                    return domains;
                },
                unzoomed: function(xDomain, yDomain) {
                    var domains = {x1: 0, x2: 0, y1: 0, y2: 0};
                    return domains;
                },
                unzoomEventType: 'dblclick.zoom'
            }
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

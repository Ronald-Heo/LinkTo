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

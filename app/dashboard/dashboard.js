'use strict';
var dashMod = angular.module('OnTheRock.dashboard', ['OnTheRock.ajaxService', 'ngStorage']);
dashMod.controller('DashboardCtrl', ['$scope', 'ajaxRequest', '$localStorage', '$state',
    function ($scope, ajaxRequest, $localStorage, $state) {

//        if (!$localStorage.user) {
//            $state.go('main.login')
//        }

        $scope.model_title = 'Add';
        $scope.list = {};
        $scope.item = {
            name: '',
            short_code: ''
        };
        $scope.loading = true;
        var ajax = ajaxRequest.sendApi('http://api.otrsw.co.za/mmi/test/bu/list');
//        var ajax = ajaxRequest.sendApi('data/list.json');
        ajax.then(function (data) {
            $scope.list = data;
            $scope.loading = false;
        });
        $scope.addItem = function () {
            $scope.model_title = 'Add';
            $scope.item = {
                name: '',
                short_code: ''
            };
        };
        $scope.editItem = function (item) {
            console.log(item);
            $scope.model_title = 'Edit';
            $scope.item = {
                name: item.name,
                short_code: item.short_code
            };
            $('#myModal').modal({backdrop: true})
        };
        $scope.saveItem = function () {
            $('#myModal').modal('hide')
        };
        $scope.page = function () {
        };

    }]);
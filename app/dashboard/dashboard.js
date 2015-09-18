'use strict';
var dashMod = angular.module('OnTheRock.dashboard', ['OnTheRock.ajaxService', 'ngStorage']);
dashMod.controller('DashboardCtrl', ['$scope', 'ajaxRequest', '$localStorage', '$state',
    function ($scope, ajaxRequest, $localStorage, $state) {

        if (!$localStorage.user) {
            $state.go('main.login')
        }

        $scope.list = {};
        //var ajax = ajaxRequest.sendApi('http://api.otrsw.co.za/mmi/test/bu/list');
        var ajax = ajaxRequest.sendApi('data/list.json');
        ajax.then(function (data) {
            $scope.list = data;
        });

        $scope.editItem = function (item) {
            console.log(item);
            alert('Edit Not Done yet');
        };
        $scope.page = function () {
            alert('Paging Not Done Yet');
        };

    }]);
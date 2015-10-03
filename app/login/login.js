'use strict';
var loginMod = angular.module('MMI.login', ['MMI.ajaxService', 'ui.router', 'ngStorage']);
loginMod.controller('LoginCtrl', ['$scope', 'ajaxRequest', '$state', '$localStorage',
    function ($scope, ajaxRequest, $state, $localStorage) {
        $scope.data = {
            username: '',
            password: ''
        };
        if ($localStorage.user) {
            $state.go('main.dashboard');
        }

        $scope.login = function () {
            console.log($scope.data);
            //can do better validation, but not doing it due to time constaint
            if ($scope.data.username.length > 0 && $scope.data.password.length > 0) {
                var ajax = ajaxRequest.send('login', $scope.data, true);
                ajax.then(function (data) {
                    $localStorage.user = $scope.data.username;
                    $state.go('main.dashboard');
                    //its not returning proper response, thats why doing like this
                }, function (data) {
                    alert(data.error);
                });
            } else {
                alert('Please fill up form!');
            }
        };
    }]);

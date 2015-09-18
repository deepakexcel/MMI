'use strict';
var registerMod = angular.module('OnTheRock.register', ['OnTheRock.ajaxService', 'ngStorage']);
registerMod.controller('RegisterCtrl', ['$scope', 'ajaxRequest', '$state', '$localStorage',
    function ($scope, ajaxRequest, $state, $localStorage) {
        $scope.data = {
            email: '',
            password: '',
            givenName: '',
            surname: ''
        };
        if ($localStorage.user) {
            $state.go('main.dashboard');
        }
        $scope.register = function () {
            //can do better validation, but not doing it due to time constaint
            console.log($scope.data);
            if ($scope.data.email.length == 0 || $scope.data.password.length == 0) {
                alert('Please fill up form!');
            } else {

                var ajax = ajaxRequest.send('register', $scope.data, true);
                ajax.then(function (data) {
                    alert('register success');
                    $localStorage.user = $scope.data.username;
                    $state.go('main.dashboard');
                    //its not returning proper response, thats why doing like this
                }, function (data) {
                    alert(data.error);
                });
            }
        }
        ;
    }]);
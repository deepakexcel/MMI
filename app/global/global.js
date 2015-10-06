'use strict';
var globalMod = angular.module('MMI.global', ['MMI.ajaxService', 'ui.router', 'ngStorage']);
globalMod.controller('GlobalCtrl', ['$scope', 'ajaxRequest', '$state', '$localStorage', '$rootScope',
    function ($scope, ajaxRequest, $state, $localStorage, $rootScope) {
        $scope.checkUser = function () {
            $scope.is_login = false;
            if ($localStorage.user) {
                console.log('user logged in');
                $scope.is_login = true;
            } else {
                console.log('user not logged in');
            }
        };
        $scope.checkUser();
        $rootScope.$on('$stateChangeStart',
                function () {
                    $scope.checkUser();
                });
        $scope.goBobjective = function () {
            $state.go("main.objective");
        }

        var mobileView = 992;

        $scope.getWidth = function () {
            return window.innerWidth;
        };

        $scope.$watch($scope.getWidth, function (newValue, oldValue) {
            if (newValue >= mobileView) {
                if (angular.isDefined($cookieStore.get('toggle'))) {
                    $scope.toggle = !$cookieStore.get('toggle') ? false : true;
                } else {
                    $scope.toggle = true;
                }
            } else {
                $scope.toggle = false;
            }

        });

        $scope.toggleSidebar = function () {
            $scope.toggle = !$scope.toggle;
//            $cookieStore.put('toggle', $scope.toggle);
        };

        window.onresize = function () {
            $scope.$apply();
        };

    }]);

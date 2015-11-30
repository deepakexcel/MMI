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
        console.log("parent Ctrl");
        console.log($state.current.name);
        var currentState = $state.current.name;

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

//        $scope.$watch($scope.getWidth, function (newValue, oldValue) {
//            if (newValue >= mobileView) {
//                if (angular.isDefined($cookieStore.get('toggle'))) {
//                    $scope.toggle = !$cookieStore.get('toggle') ? false : true;
//                } else {
//                    $scope.toggle = true;
//                }
//            } else {
//                $scope.toggle = false;
//            }
//
//        });

        $scope.toggleSidebar = function () {
            $scope.toggle = !$scope.toggle;
            if ($scope.toggle) {
                $scope.menuHide = true;
            } else {
                $scope.menuHide = false;
            }
//            $cookieStore.put('toggle', $scope.toggle);
        };

        window.onresize = function () {
            $scope.$apply();
        };

        if (currentState == "main.graph") {
            $scope.summaryMenu = false;
            $scope.adminMenu = false;
            $scope.visualizationMenu = true;
        } else if (currentState == "main.objectiveGrid" || currentState == "main.summary") {
            $scope.summaryMenu = true;
            $scope.adminMenu = false;
            $scope.visualizationMenu = false;
        } else if (currentState == "main.dashboard" || currentState == "main.objective" || currentState == "main.initiative" || currentState == "main.capabilities") {
            $scope.summaryMenu = false;
            $scope.adminMenu = true;
            $scope.visualizationMenu = false;
        } else {
            $scope.summaryMenu = false;
            $scope.adminMenu = false;
            $scope.visualizationMenu = false;
        }

        $scope.checkMenu = function (menuItem) {
            if (menuItem == "summaryMenu") {
                $scope.summaryMenu = true;
                $scope.adminMenu = false;
                $scope.visualizationMenu = false;
            } else if (menuItem == "visualizationMenu") {
                $scope.summaryMenu = false;
                $scope.adminMenu = false;
                $scope.visualizationMenu = true;
            } else if (menuItem == "adminMenu") {
                $scope.summaryMenu = false;
                $scope.adminMenu = true;
                $scope.visualizationMenu = false;
            } else {
                $scope.summaryMenu = false;
                $scope.adminMenu = false;
                $scope.visualizationMenu = false;
            }
        }



    }]);


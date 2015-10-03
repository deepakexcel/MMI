'use strict';
var globalMod = angular.module('MMI.global', ['MMI.ajaxService', 'ui.router', 'ngStorage']);
globalMod.controller('GlobalCtrl', ['$scope', 'ajaxRequest', '$state', '$localStorage', '$rootScope',
    function ($scope, ajaxRequest, $state, $localStorage, $rootScope) {
        $scope.checkUser = function () {
            $scope.is_login = false;
            if ($localStorage.user) {
                console.log('user logged in');
                $scope.is_login = true;
            }else{
                console.log('user not logged in');
            }
        };
        $scope.checkUser();
        $rootScope.$on('$stateChangeStart',
                function () {
                    $scope.checkUser();
                });
	$scope.goBobjective = function(){
		$state.go("main.objective");
	}

    }]);

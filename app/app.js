'use strict';
//robust-catapult
// Declare app level module which depends on views, and components
var app = angular.module('MMI', [
    'ui.router',
    'MMI.login',
    'MMI.register',
    'MMI.dashboard',
    'MMI.global',
    'MMI.version'
]);
app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
//        $httpProvider.interceptors.push('AuthInterceptor');
        //STORMPATH_CONFIG.ENDPOINT_PREFIX = 'http://127.0.0.1:3000';
        $stateProvider
                .state('main', {
                    url: "/main",
                    abstract: true,
                    templateUrl: "global/menu.html?time=" + new Date().getTime(),
                    controller: 'GlobalCtrl'
                })
                .state('main.login', {
                    url: "/login",
                    templateUrl: "login/login.html",
                    controller: 'LoginCtrl'
                })
                .state('main.register', {
                    url: "/register",
                    templateUrl: "register/register.html",
                    controller: 'RegisterCtrl'
                })
                .state('main.dashboard', {
                    url: "/dashboard",
                    templateUrl: "dashboard/dashboard.html?time=" + new Date().getTime(),
                    controller: 'DashboardCtrl'
                })
                .state('main.logout', {
                    url: "/dashboard",
                    controller: function ($state, $localStorage) {
                        $localStorage.user = false;
                        $state.go('main.login');
                    }
                });
        $urlRouterProvider.otherwise('/main/dashboard');
    }]);
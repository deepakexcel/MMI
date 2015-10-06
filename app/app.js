'use strict';
//robust-catapult
// Declare app level module which depends on views, and components
var app = angular.module('MMI', [
    'ui.router',
    'MMI.login',
    'MMI.register',
    'MMI.dashboard',
    'MMI.objective',
    'MMI.initiative',
    'MMI.capabilities',
    'MMI.summary',
    'MMI.objectiveGrid',
    'MMI.global',
    'MMI.version',
    'MMI.start',
    'MMI.graph'
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
                .state('main.objective', {
                    url: "/objective",
                    templateUrl: "objective/objective.html?time=" + new Date().getTime(),
                    controller: 'ObjectiveCtrl'
                })
                .state('main.initiative', {
                    url: "/initiative",
                    templateUrl: "initiative/initiative.html?time=" + new Date().getTime(),
                    controller: 'InitiativeCtrl'
                })
		.state('main.capabilities', {
                    url: "/capabilities",
                    templateUrl: "capabilities/capabilities.html?time=" + new Date().getTime(),
                    controller: 'CapabilitiesCtrl'
                })
                
                .state('main.summary', {
                    url: "/summary",
                    templateUrl: "summary/summary.html?time=" + new Date().getTime(),
                    controller: 'SummaryCtrl'
                })
                
                .state('main.objectiveGrid', {
                    url: "/objectiveGrid/:a",
                    templateUrl: "gridExplorer/objectiveGrid.html?time=" + new Date().getTime(),
                    controller: 'ObjectiveGridCtrl'
                })
                
                .state('main.graph', {
                    url: "/graph/:graph",
                    templateUrl: "graph/graph.html?time=" + new Date().getTime(),
                    controller: 'graphCtrl'
                })
                .state('main.start', {
                    url: "/start",
                    templateUrl: "statrup/start.html?time=" + new Date().getTime(),
                 controller: 'StartCtrl'
                })
                .state('main.logout', {
                    url: "/dashboard",
                    controller: function ($state, $localStorage) {
                        $localStorage.user = false;
                        $state.go('main.login');
                    }
                });
        $urlRouterProvider.otherwise('/main/start');
    }]);

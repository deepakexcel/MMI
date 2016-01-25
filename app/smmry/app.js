'use strict';
var app = angular.module('MMI', [
    'ui.router',
    'ui.bootstrap',
    'MMI.summary',
    'MMI.objectiveGrid',
    'MMI.global',
    'MMI.explore',
    'MMI.start',
    'MMI.graph',
    'MMI.dir',
    'MMI.downDrill'
]);
app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider
            .state('main', {
                url: "/main",
                abstract: true,
                templateUrl: "global/menu.html?time=" + new Date().getTime(),
                controller: 'GlobalCtrl'
            })
            .state('main.start', {
                url: "/start",
                views: {
                    'left': {
                        templateUrl: "../statrup/start.html?time=" + new Date().getTime(),
                        controller: 'StartCtrl'
                    }
                }
            })
            .state('main.graph', {
                    url: "/graph/:graph",
                    templateUrl: "../graph/graph.html?time=" + new Date().getTime(),
                    controller: 'graphCtrl'
            })
            .state('main.downdrill', {
                url: "/downdrill",
                views: {
                    'left': {
                        templateUrl: "summary/summary.html?time=" + new Date().getTime(),
                        controller: 'SummaryCtrl'
                    },
                    'right': {
                        templateUrl: "downdrill/drill.html?time=" + new Date().getTime(),
                        controller: 'downDrillCtrl'
                    }
                }
            })
            .state('main.summary', {
                url: "/summary",
                views: {
                    'left': {
                        templateUrl: "summary/summary.html?time=" + new Date().getTime(),
                        controller: 'SummaryCtrl'
                    },
                    'right': {
                        templateUrl: "downdrill/drill.html?time=" + new Date().getTime(),
                        controller: 'downDrillCtrl'
                    }
                }
            });
        $urlRouterProvider.otherwise('/main/start');
    }
]);
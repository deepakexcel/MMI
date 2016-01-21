(function () {
    'use strict';
    angular.module('MMI.downDrill')
            .config(route);
    function route($stateProvider)
    {
        $stateProvider
                .state('main.downDrill', {
                    url:"/drilldown/:graphname?&param1&param2&param3",
			templateUrl:"downdrill/drill.html?time="+new Date().getTime(),
			controller:'downDrillCtrl'
                })
		.state('bu', {
                   url:"/bu",
            templateUrl:"partials/partial_crud_bu.html?time="+new Date().getTime(),
            controller:'buController'
               })

                       .state('bu.edit', {
                   url:"/edit/:id",
            templateUrl:"partials/partial_crud_bu.html?time="+new Date().getTime(),
            controller:'buController'
               })
		.state('error', {
                   url:"/drilldown/error",
            	templateUrl:"downdrill/error.html?time="+new Date().getTime(),
            	controller:'errorCtrl'
               })
    }
    ;
})();


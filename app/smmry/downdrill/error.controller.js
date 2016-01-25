(function () {
    'use strict';
    angular.module('MMI.explore')
            .controller('errorCtrl', errorCtrl);
    function errorCtrl($scope, $stateParams, ajaxRequest, $rootScope)
    {
   
	console.log("error page");
    };
    
})();


(function () {
    'use strict';
    angular.module('MMI.explore')
            .config(route);
    function route($stateProvider)
    {
        $stateProvider
                .state('main.explore', {
                    url: "/explore",
                    templateUrl: "explore/explore.html",
                    controller: 'ExploreCtrl'
                });
    }
    ;
})();



(function () {
    'use strict';
    angular.module('MMI.explore')
            .config(route);
    function route($stateProvider)
    {
        $stateProvider
                .state('main.explore', {
                    url: "/explore/:id",
                    templateUrl: "explore/explore.html",
                    controller: 'ExploreCtrl'
                });
    }
    ;
})();



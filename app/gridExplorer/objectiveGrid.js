
'use strict';
var dashMod = angular.module('MMI.objectiveGrid', ['MMI.ajaxService', 'ngStorage']);
dashMod.controller('ObjectiveGridCtrl', ['$scope', 'ajaxRequest', '$q', '$timeout', '$state', '$stateParams',
    function ($scope, ajaxRequest, $q, $timeout, $state, $stateParams) {
        window.document.title = "Summary";
        $scope.model_title = 'Add Business Objective';

        var unit_Ids = $stateParams.a;
        console.log(unit_Ids);

        $scope.loading = true;
        var objsummary2 = [];
        var recentTrace2 = [];
        var grid = ajaxRequest.send('bo/filterlist?buid=' + unit_Ids);
        grid.then(function (data) {
            console.log(data);
            $scope.loading = false;
            objsummary2 = data;
            $scope.objGrid = data;
            console.log($scope.objGrid[0]);

            var initgrid = ajaxRequest.send('bi/filterlist?boid=43');
            initgrid.then(function (data) {
                console.log(data);
                $scope.loading = false;
//                objsummary2 = data;
                $scope.objGridd = data;
            });
        });

        $scope.showInitiative = function (objItem, indexz) {
            console.log(objItem);
            console.log(indexz);

            var initgrid = ajaxRequest.send('bi/filterlist?boid=' + objItem.id);
            initgrid.then(function (data) {
                console.log(data);
                $scope.loading = false;
//                objsummary2 = data;
                $scope.objGridd = data;
            });
        }

    }]);
// http://api.otrsw.co.za/mmi/test/bi/filterlist?boid=43
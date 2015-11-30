
'use strict';
var dashMod = angular.module('MMI.objectiveGrid', ['MMI.ajaxService', 'ngStorage']);
dashMod.controller('ObjectiveGridCtrl', ['$scope', 'ajaxRequest', '$q', '$timeout', '$state', '$stateParams',
    function ($scope, ajaxRequest, $q, $timeout, $state, $stateParams) {
        window.document.title = "Summary";
        $scope.model_title = 'Add Business Objective';

        var unit_Ids = $stateParams.a;
        var unit_name = $stateParams.b;
        console.log("idds :- " + unit_Ids);
        console.log("Name :- " + unit_name);
        $scope.business_Unit = unit_name;
	$scope.loadingBu = true;
        $scope.loading = true;
        var objsummary2 = [];
        var recentTrace2 = [];
        var grid = ajaxRequest.send('bo/filterlist?buid=' + unit_Ids);
        grid.then(function (data) {
            console.log(data);
            $scope.loading = false;
            objsummary2 = data;
            $scope.objGrid = data;
            console.log($scope.objGrid[0].id);
		
		$scope.actual = 0;
		$scope.selected_Objective = objsummary2[0].name;
            var initgrid = ajaxRequest.send('bi/filterlist?boid='+ objsummary2[0].id);
            initgrid.then(function (data) {
                console.log(data);
                $scope.loadingBu = false;
//                objsummary2 = data;
                $scope.objGridd = data;
            });
        });

        $scope.showInitiative = function (objItem, indexz) {
		$scope.loadingBu = true;
            $scope.selected_Objective = objItem.name;
            $scope.actual = indexz;

            console.log(objItem);
            console.log(indexz);

            var initgrid = ajaxRequest.send('bi/filterlist?boid=' + objItem.id);
            initgrid.then(function (data) {
                console.log(data);
                $scope.loadingBu = false;
//                objsummary2 = data;
                $scope.objGridd = data;
            });
        };

    }]);
// http://api.otrsw.co.za/mmi/test/bi/filterlist?boid=43

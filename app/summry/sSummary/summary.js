
'use strict';
var dashMod = angular.module('MMI.summary', ['MMI.ajaxService', 'ngStorage']);
dashMod.controller('SummaryCtrl', ['$scope', 'ajaxRequest', '$q', '$timeout', '$state',
    function ($scope, ajaxRequest, $q, $timeout, $state) {
        window.document.title = "Summary";
        $scope.model_title = 'Add Business Objective';
        $scope.objective_list = {};
        $scope.item = {
            business_unitSummary: ''
        };
        $scope.loading = true;
        $scope.gridBox = false;
        var unitList2 = [];
        var unit = ajaxRequest.send('lookups/bu/list');
        unit.then(function (data1) {
            console.log(data1);
            unitList2 = data1;
            $scope.unitList = data1;
            $scope.item.business_unitSummary = $scope.unitList[0].displayName;
            $scope.summaryfire($scope.item.business_unitSummary);
        });

        var unitsummary2 = [];
        var recentTrace2 = [];
        var unitId;
        var unitDispName;
        $scope.summaryfire = function (unitName) {
            $scope.gridBox = false;
            $scope.loading = true;
            unitDispName = unitName;
            $scope.unitSummary = "";
            $scope.recentTrace = ""
            console.log(unitName);

            for (var i = 0; i < unitList2.length; i++) {
                if (unitList2[i].displayName == unitName) {
                    unitId = unitList2[i].id;
                    console.log(unitId);

                }
            }
            $scope.id=unitId;
            
            var summaryData = ajaxRequest.send('bu/summary?id=' + unitId);
            summaryData.then(function (data) {

                $scope.unitSummary = data;
                console.log($scope.unitSummary);
                $scope.ragStatus = data.summary.bi_breakdown;
                console.log($scope.ragStatus);
            });

            var recent = ajaxRequest.send('audit/history/bu/recent?id=' + unitId);
            recent.then(function (data1) {
                console.log(data1);
                recentTrace2 = data1;
                $scope.loading = false;
                $scope.gridBox = true;
                console.log("Id:- " + unitId);
                $scope.recentTrace = data1;
                $scope.loading = false;

            });

        };
        $scope.ragName = function (key) {
            if (key == 'A')
                return 'Amber';
            else if (key == 'N')
                return "New";
            else if (key == 'D')
                return "Done";
            else if (key == 'R')
                return "Red";
            else if (key == 'G')
                return "Green";
        }
        $scope.explore = function () {
            $('#DelError_Modal').modal('show');
        }

        $scope.exploreObjectives = function () {
//            alert(unitId);
            $state.go('main.objectiveGrid', {a: unitId, b: unitDispName})
//            $('#DelError_Modal').modal('show');
        }
	$scope.drilldownGraph=function(){
		$state.go('main.downDrill');	
	}
	$scope.downdrill=function(){
        $state.go('main.downDrill');
    }
	$scope.capExplore=function(){
	$state.go('main.downdrill');
	}

    }]);


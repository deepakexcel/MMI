
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
        $scope.summaryfire = function (unitName) {
            $scope.unitSummary="";
            $scope.recentTrace=""
            console.log(unitName);
            
            for (var i = 0; i < unitList2.length; i++) {
                if (unitList2[i].displayName == unitName) {
                    unitId = unitList2[i].id;
                    console.log(unitId);

                }
            }
            var summaryData = ajaxRequest.send('bu/summary?id=' + unitId);
            summaryData.then(function (data) {
                console.log(data);
                unitsummary2 = data;
                $scope.unitSummary = data;
            });

            var recent = ajaxRequest.send('audit/history/bu/recent?id=' + unitId);
            recent.then(function (data1) {
                console.log(data1);
                recentTrace2 = data1;
                $scope.recentTrace = data1;
                $scope.loading = false;

            });

        };

        $scope.explore = function () {
            $('#DelError_Modal').modal('show');
        }

        $scope.exploreObjectives = function () {
//            alert(unitId);
            $state.go('main.objectiveGrid',{a: unitId})
//            $('#DelError_Modal').modal('show');
        }

    }]);

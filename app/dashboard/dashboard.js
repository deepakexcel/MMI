'use strict';
var dashMod = angular.module('MMI.dashboard', ['MMI.ajaxService', 'ngStorage']);
dashMod.controller('DashboardCtrl', ['$scope', 'ajaxRequest', '$localStorage', '$q', '$http','$state',
    function ($scope, ajaxRequest, $localStorage, $q, $http, $state) {

//        if (!$localStorage.user) {
//            $state.go('main.login')
//        }

        $scope.model_title = 'Add';
        $scope.list = {};
        $scope.item = {
            name: '',
            short_code: ''
        };
        $scope.loading = true;
        var ajax = ajaxRequest.send('bu/list');
       // var ajax = ajaxRequest.sendApi('data/list.json');
        ajax.then(function (data) {
            $scope.list = data;
            $scope.loading = false;
        });
        $scope.addItem = function () {
            $scope.buttonShow = true;
            $scope.model_title = 'Add';
            $scope.item = {
                name: '',
                short_code: ''
            };
        };
        $scope.editItem = function (item) {
            $scope.buttonShow = false;
            console.log('In editItem function - lets log item we have:');
            console.log(item);
            $scope.model_title = 'Edit';
            //Just a question - why do you create a "new" item and not pass the item you got?
            //Problem was caused by you not passing the id, so the API does not know which
            //item to update
            
            
            //I stuck to your approach, and simply added the id back in
            $scope.item = {
                id: item.id,
                name: item.name,
                short_code: item.short_code,
                org_level: item.org_level
            };
            $('#myModal').modal({backdrop: true})
        };
        $scope.saveItem = function () {
            var url = 'bu/add';
            var values = {"name": $scope.item.name, "short_code": $scope.item.short_code, "org_level": $scope.item.org_level, };
		$http.post("http://api.otrsw.co.za/mmi/test/bu/add",values)
               .success(function (data, status, headers, config) {
                    console.log("inserted Successfully");   
               });
           //var promise = ajaxRequest.send(url, values, 'POST');
            $('#myModal').modal('hide');
        };

        $scope.page = function () {
        };

        $scope.editRecord = function () {
            if (!$scope.item.short_code || !$scope.item.name || !$scope.item.org_level) {
                alert("pls must fill all the field");
            } else {
                var url = 'bu/update';
                console.log($scope);
                //Id needs to be included to the API call:
                var values = {"id":$scope.item.id,  "name": $scope.item.name, "short_code": $scope.item.short_code, "org_level": $scope.item.org_level };
                console.log("Going to send update. Values listed below:");
                console.log(values);
                var promise = ajaxRequest.send(url, values, 'POST');
                $('#myModal').modal('hide');
                console.log("Edit Call");
                $('#myModal').modal('hide');
            }
        }

        $scope.deleteItem = function (items) {
            console.log(items.id);
            var url = 'bu/delete';
            var dataId = items.id;
            var promise = ajaxRequest.send(url, dataId, 'POST');
            console.log("Delete Call");
        }

    }]);
'use strict';
var dashMod = angular.module('MMI.dashboard', ['MMI.ajaxService', 'ngStorage']);
dashMod.controller('DashboardCtrl', ['$scope', 'ajaxRequest', '$localStorage', '$q', '$http', '$state',
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
//$scope.Delete="Delete"
//$scope.method="delPopover";
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
        $scope.editItem = function (item, index) {
            $scope.buttonShow = false;
            console.log('In editItem function - lets log item we have:');
            console.log(item);
            console.log(index);
            $scope.model_title = 'Edit';
            //Just a question - why do you create a "new" item and not pass the item you got?
            //Problem was caused by you not passing the id, so the API does not know which
            //item to update


            //I stuck to your approach, and simply added the id back in
            $scope.item = {
                id: item.id,
                name: item.name,
                short_code: item.short_code,
                org_level: item.org_level,
                index: index
            };
            $('#myModal').modal({backdrop: true})
        };
        $scope.list = [];
        $scope.saveItem = function () {
            var myobj = {};
            var url = 'bu/add';
            var values = {"name": $scope.item.name, "short_code": $scope.item.short_code, "org_level": $scope.item.org_level, };
            /*$http.post("http://api.otrsw.co.za/mmi/test/bu/add", values)
             .success(function (data, status, headers, config) {	
             console.log(data);
             if (data.status == "OK") {
             $scope.saveLoading = false;
             console.log("Status Ok");
             myobj.id = data.lastid;
             myobj.name = $scope.item.name;
             myobj.short_code = $scope.item.short_code;
             myobj.org_level = $scope.item.org_level;
             $scope.list.unshift(myobj);
             $('#myModal').modal('hide');
             
             } else {
             console.log("Error Save")
             console.log(data.error);
             $scope.saveLoading = false;
             $('#myModal').modal('hide');
             }
             console.log("inserted Successfully");
             });*/
            var promise = ajaxRequest.send(url, values, 'POST');
            promise.then(
                    function (result) {
                        //$scope.saveLoading = false;
                        console.log("Hello");
                        if (result.status == "OK") {
                            $scope.saveLoading = false;
                            console.log("Status Ok");
                            myobj.id = result.lastid;
                            myobj.name = $scope.item.name;
                            myobj.short_code = $scope.item.short_code;
                            myobj.org_level = $scope.item.org_level;
                            $scope.list.unshift(myobj);
                            $('#myModal').modal('hide');
                        } else {
                            console.log("Error Save")
                            console.log(data.error);
                            alert(result.error);
                            $scope.saveLoading = false;
                            $('#myModal').modal('hide');
                        }
                    });
            promise.catch(
                    function (e) {
                        console.log(e);
                        alert(e);
                        //$scope.saveLoading = false;
                        //$('#myModal').modal('hide');
                    });
        };
        $scope.page = function () {
        };
        $scope.editRecord = function (indexx) {
            console.log($scope.item.index);
            if (!$scope.item.short_code || !$scope.item.name || !$scope.item.org_level) {
                alert("pls must fill all the field");
            } else {
                var url = 'bu/update';
                console.log($scope);
                //Id needs to be included to the API call:
                var values = {"id": $scope.item.id, "name": $scope.item.name, "short_code": $scope.item.short_code, "org_level": $scope.item.org_level};
                console.log("Going to send update. Values listed below:");
                console.log(values);
                var promise = ajaxRequest.send(url, values, 'POST');
                promise.then(
                        function (result) {
                            //$scope.saveLoading = false;
                            console.log("Hello");
                            if (result.status == "OK") {
                                console.log(result);
                                console.log($scope.list);
                                $scope.list.splice($scope.item.index, 1, values);
                                $scope.saveLoading = false;
                                $('#myModal').modal('hide');
                            } else {
                                console.log("Error Edit")
                                console.log(result.error);
                                alert(result.error);
                                $scope.saveLoading = false;
                                $('#myModal').modal('hide');
                            }
                        });
                promise.catch(
                        function (e) {
                            console.log(e);
                            alert(e);
                            $scope.saveLoading = false;
                            // $('#myModal').modal('hide');
                        });
                console.log("Edit Call");
            }
        }

        $scope.deleteItem = function (items, indexs) {
            //$scope.method="delPopover";
            //$scope.Delete="Delete"
            $scope.ifpopover = items.id;
            $scope.deleteLoader = items.id;
            console.log(items.id);
            console.log(indexs);
            var url = 'bu/delete';
            var dataId = {"id": items.id};
            var promise = ajaxRequest.send(url, dataId, 'POST');
            promise.then(
                    function (result) {
                        $scope.deleteLoader = false;
                        console.log("Hello Delete");
                        if (result.status == "OK") {
                            console.log(result);
                            // console.log($scope.list);
                            $scope.list.splice(indexs, 1);
                            //console.log($scope.list);
                        } else {
                            console.log("Error delete")
                            console.log(result.error);
                            alert(result.error);
                        }
                    });
            promise.catch(
                    function (e) {
                        console.log(e);
                        // $scope.deleteLoader = false;
                        alert(e);
                    });
            console.log("Delete Call");
        }


        $scope.delPopover = function (item, index) {
            console.log("jjjjjj");
            console.log($scope.ifpopover);
            //$scope.method="deleteItem";
            $scope.Delete = "Confirm"
            $scope.ifpopover = item.id;
            var elem = angular.element(document.getElementById(index));
            console.log(elem);
            elem.popover('show');
            elem.on('hidden.bs.popover', function () {
                // do something…
                console.log("popover");
                $scope.ifpopover = item.id;

            })
        }

    }]);

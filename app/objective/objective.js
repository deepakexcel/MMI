
'use strict';
var dashMod = angular.module('MMI.objective', ['MMI.ajaxService', 'ngStorage']);
dashMod.controller('ObjectiveCtrl', ['$scope', 'ajaxRequest', '$localStorage', '$q', '$http', '$state',
    function ($scope, ajaxRequest, $localStorage, $q, $http, $state) {

//        if (!$localStorage.user) {
//            $state.go('main.login')
//        }

        $scope.model_title = 'Add';
        $scope.list = {};
        $scope.item = {
            name: '',
            short_code: '',
            org_level: '',
            status: ''
        };

        $scope.loading = true;
        var ajax = ajaxRequest.send('bo/list');
        // var ajax = ajaxRequest.sendApi('data/list.json');
        ajax.then(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].status = false;
            }
            $scope.list = data;
            console.log(data);
            $scope.loading = false;
        });
        var unitList2=[];
        var unit = ajaxRequest.send('bu/list');
        // var ajax = ajaxRequest.sendApi('data/list.json');
        unit.then(function (data1) {
             unitList2 = data1;
            $scope.unitList = data1;
            console.log(data1);
            $scope.loading = false;
        });

        $scope.addItem = function () {
            $scope.buttonShow = true;
            $scope.model_title = 'Add';
            $scope.item = {
                name: '',
                business_unit: '',
                description: '',
                status: ''
            };
        };
        $scope.editItem = function (item, index) {
            $scope.buttonShow = false;
            console.log('In editItem function - lets log item we have:');
            $scope.model_title = 'Edit';
            console.log(item);
            console.log(unitList2);
            var unitName;
            for (var i = 0; i < unitList2.length; i++) {
                console.log(item.business_unit_id);
                if(item.business_unit_id == unitList2[i].id){
                    console.log(unitList2[i].name);
                    unitName = unitList2[i].name
                }
            }
            $scope.item = {
                id: item.id,
                name: item.name,
                business_unit: unitName,
                description: item.description,
                index: index,
                status: item.status
            };
            $('#myModal').modal({backdrop: true})
        };
        $scope.list = [];
        $scope.saveItem = function () {
            console.log($scope.item.business_unit);
            console.log($scope.item.name);
            console.log($scope.item.description);
           
            console.log(unitList2);
            var bussUnit = 0;
            for (var i = 0; i < unitList2.length; i++) {
                console.log(unitList2[i].name);
                console.log(unitList2[i].id);
                if (unitList2[i].name == $scope.item.business_unit) {
                    console.log("Name :- " + unitList2[i].name + "ID :- " + unitList2[i].id);
                    bussUnit = unitList2[i].id
                    console.log("Buss :- " + bussUnit);
                }
            }
            var myobj = {};
            var url = 'bo/add';
            var values = {"business_unit_id": bussUnit, "description": $scope.item.description, "name": $scope.item.name};
            var promise = ajaxRequest.send(url, values, 'POST');
            promise.then(
                    function (result) {
                        if (result.status == "OK") {
                            $scope.saveLoading = false;
                            myobj.id = result.lastid;
                            myobj.name = $scope.item.name;
                            myobj.business_unit_id = "110";
                            myobj.description = $scope.item.description;
                            myobj.status = false;
                            $scope.list.unshift(myobj);
                            $('#myModal').modal('hide');
                        } else {
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
                    });
        };
        $scope.page = function () {
        };
        $scope.editRecord = function (indexx) {
            var bussUnit = 0;
            if (!$scope.item.name || !$scope.item.business_unit || !$scope.item.description) {
                alert("pls must fill all the field");
            } else {
                
                for (var i = 0; i < unitList2.length; i++) {
                console.log(unitList2[i].name);
                console.log(unitList2[i].id);
                if (unitList2[i].name == $scope.item.business_unit) {
                    console.log("Name :- " + unitList2[i].name + "ID :- " + unitList2[i].id);
                    bussUnit = unitList2[i].id
                    console.log("Buss :- " + bussUnit);
                }
            }
                var url = 'bo/update';
                //Id needs to be included to the API call:
                var values = {"id": $scope.item.id,"business_unit_id": bussUnit, "description": $scope.item.description, "name": $scope.item.name};
                console.log("Going to send update. Values listed below:");
                var promise = ajaxRequest.send(url, values, 'POST');
                promise.then(
                        function (result) {
                            if (result.status == "OK") {
                                $scope.list.splice($scope.item.index, 1, values);
                                $scope.saveLoading = false;
                                $('#myModal').modal('hide');
                            } else {
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
                        });
            }
        }

        $scope.deleteItem = function (items, indexs) {
            $scope.ifpopover = items.id;
            $scope.deleteLoader = items.id;
            var url = 'bo/delete';
            var dataId = {"id": items.id};
            var promise = ajaxRequest.send(url, dataId, 'POST');
            promise.then(
                    function (result) {
                        $scope.deleteLoader = false;
                        if (result.status == "OK") {
                            $scope.list.splice(indexs, 1);
                        } else {
                            console.log(result.error);
                            alert(result.error);
                        }
                    });
            promise.catch(
                    function (e) {
                        console.log(e);
                        alert(e);
                    });
        }
        $scope.delPopover = function (item, index) {
            var elem = angular.element(document.getElementById(index));
            if (item.status == false) {
                item.status = true;
                $scope.Delete = "Confirm";
                $scope.ifpopover = item.id;

                elem.popover('show');

            } else {
                console.log("else");
                elem.popover('hide');
                item.status = false;
                $scope.deleteItem(item, index);
            }
        }

        $scope.hidePopove = function (item, index) {
            item.status = false;
            var elem = angular.element(document.getElementById(index));
            elem.popover('hide');

            $scope.ifpopover = "";
        }

    }]);
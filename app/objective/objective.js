
'use strict';
var dashMod = angular.module('MMI.objective', ['MMI.ajaxService', 'ngStorage']);
dashMod.controller('ObjectiveCtrl', ['$scope', 'ajaxRequest', '$q', '$timeout', '$rootScope',
    function ($scope, ajaxRequest, $q, $timeout, $rootScope) {
        window.document.title = "Business Objective";
        $scope.model_title = 'Add Business Objective';
        $scope.objective_list = {};
        $scope.item = {
            objective_name: '',
            business_unit: '',
            description: '',
            status: '',
            unit_name: ''
        };
        $scope.loading = true;
        var unitList2 = [];
        var unit = ajaxRequest.send('lookups/bu/list');
        //console.log(data1);
        // var ajax = ajaxRequest.sendApi('data/list.json');
        unit.then(function (data1) {
            //console.log(unit);
            console.log(data1);
            unitList2 = data1;
            $scope.unitList = data1;
            //$scope.loading = false;

            var ajax = ajaxRequest.send('bo/list');
            // var ajax = ajaxRequest.sendApi('data/list.json');
            ajax.then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].status = false;
                    for (var j = 0; j < unitList2.length; j++) {
                        if (data[i].business_unit_id == unitList2[j].id) {
                            data[i].unit_name = unitList2[j].displayName;
                        }
                    }
                }
                $scope.objective_list = data;
                console.log(data);
                $scope.loading = false;
            });
        });



        $scope.addItem = function () {
            $scope.hideAllError();
            $scope.buttonShow = true;
            $scope.model_title = 'Add Business Objective';
            $scope.item = {
                objective_name: '',
                business_unit: '',
                description: '',
                status: '',
                unit_name: ''
            };
        };


        $scope.editObjectiveItem = function (item, index) {
            $scope.hideAllError();
            console.log(item);
            $scope.buttonShow = false;
            console.log('In editItem function - lets log item we have:');
            $scope.model_title = 'Edit Business Objective';
            var unitName;
            for (var i = 0; i < unitList2.length; i++) {
                if (item.business_unit_id == unitList2[i].id) {
                    unitName = unitList2[i].displayName;
                }
            }
            $scope.item = {
                id: item.id,
                objective_name: item.name,
                business_unit: item.unit_name,
                description: item.description,
                index: index,
                status: item.status,
                unit_id: item.business_unit_id
            };
            $rootScope.$emit('modal-obj-show');
        };

        $scope.objective_list = [];
        $scope.saveObjectiveItem = function () {

            if (!$scope.item.objective_name && !$scope.item.business_unit) {
                $scope.errorName = "has-error has-feedback";
                $scope.nameClose = true;
                $scope.errorUnitName = "has-error has-feedback";
                $scope.selectClose = true;
            } else if (!$scope.item.objective_name) {
                $scope.errorName = "has-error has-feedback";
                $scope.nameClose = true;
            } else if (!$scope.item.business_unit) {
                $scope.errorUnitName = "has-error has-feedback";
                $scope.selectClose = true;
            } else {
                $scope.saveLoading = true;
                var bussUnit = 0;
                for (var i = 0; i < unitList2.length; i++) {
                    if (unitList2[i].displayName == $scope.item.business_unit) {
                        bussUnit = unitList2[i].id
                    }
                }
                var myobj = {};
                var url = 'bo/add';
                var values = {"business_unit_id": bussUnit, "description": $scope.item.description, "name": $scope.item.objective_name};
                var promise = ajaxRequest.send(url, values, 'POST');
                promise.then(
                        function (result) {
                            if (result.status == "OK") {
                                $scope.saveLoading = false;
                                myobj.id = result.lastid;
                                myobj.name = $scope.item.objective_name;
                                myobj.business_unit_id = bussUnit;
                                myobj.description = $scope.item.description;
                                myobj.status = false;
                                myobj.unit_name = $scope.item.business_unit;
                                $scope.objective_list.unshift(myobj);
                                $('#objective_Modal').modal('hide');
                            } else {
                                console.log(data.error);
                                //alert(result.error);
                                $scope.alertmsg = true;
                                $scope.saveLoading = false;
                                $scope.hideAlert();
                                $('#objective_Modal').modal('hide');
                            }
                        });
                promise.catch(
                        function (e) {
                            console.log(e);
                            $scope.alertmsg = true;
                            $scope.hideAlert();
                        });
            }
        };
        $scope.page = function () {
        };
        $scope.$on('modal-close-obj', function (ev, data) {
            console.log(data);
            if (!data.type)
            {
                $scope.objective_list.splice($scope.item.index, 1, data.data);
            }
            else {
                $scope.objective_list.unshift(data.data)
            }
        });
//        $scope.editObjectiveRecord = function (indexx) {
//            var bussUnit = 0;
//            if (!$scope.item.objective_name && !$scope.item.business_unit) {
//                $scope.errorName = "has-error has-feedback";
//                $scope.nameClose = true;
//                $scope.errorUnitName = "has-error has-feedback";
//                $scope.selectClose = true;
//                $scope.saveLoading = false;
//                //alert("pls must fill all the field");
//            } else if (!$scope.item.objective_name) {
//                $scope.errorName = "has-error has-feedback";
//                $scope.nameClose = true;
//            } else if (!$scope.item.business_unit) {
//                $scope.errorUnitName = "has-error has-feedback";
//                $scope.selectClose = true;
//            } else {
//                $scope.saveLoading = true;
//                for (var i = 0; i < unitList2.length; i++) {
//
//                    if (unitList2[i].displayName == $scope.item.business_unit) {
//                        bussUnit = unitList2[i].id;
//                    }
//                }
//                var url = 'bo/update';
//                //Id needs to be included to the API call:
//                var val = {"id": $scope.item.id, "business_unit_id": bussUnit, "description": $scope.item.description, "name": $scope.item.objective_name, "unit_name": $scope.item.business_unit, "status": false};
//                var values = {"id": $scope.item.id, "business_unit_id": bussUnit, "description": $scope.item.description, "name": $scope.item.objective_name};
//                console.log("Going to send update. Values listed below:");
//                var promise = ajaxRequest.send(url, values, 'POST');
//                promise.then(
//                        function (result) {
//                            if (result.status == "OK") {
//                                $scope.objective_list.splice($scope.item.index, 1, val);
//                                $scope.saveLoading = false;
//                                $('#objective_Modal').modal('hide');
//                            } else {
//                                console.log(result.error);
//                                // alert(result.error);
//                                $scope.alertmsg = true;
//                                $scope.saveLoading = false;
//                                $scope.hideAlert();
//                                $('#objective_Modal').modal('hide');
//                            }
//                        });
//                promise.catch(
//                        function (e) {
//                            console.log(e);
//                            //alert(e);
//                            $scope.alertmsg = true;
//                            $scope.saveLoading = false;
//                            $scope.hideAlert();
//                        });
//            }
//        }

        $scope.deleteObjectiveItem = function (items, indexs) {
            $scope.ifpopover = items.id;
            $scope.deleteLoader = items.id;
            var url = 'bo/delete';
            var dataId = {"id": items.id};
            var promise = ajaxRequest.send(url, dataId, 'POST');
            promise.then(
                    function (result) {
                        $scope.deleteLoader = false;
                        if (result.status == "OK") {
                            $scope.objective_list.splice(indexs, 1);
                        } else {
                            console.log(result.error);
                            $('#DelError_Modal').modal('show');
                            $scope.delErr = result.error;
                            $scope.deleteLoader = false;
                            $scope.ifpopover = "";
                            //alert(result.error);
                            //$scope.alertmsg = true;
                            //$scope.hideAlert();
                        }
                    });
            promise.catch(
                    function (e) {
                        console.log(e);
                        $('#DelError_Modal').modal('show');
                        $scope.delErr = e;
                        //alert(e);
                        //$scope.alertmsg = true;
                        $scope.deleteLoader = false;
                        // $scope.hideAlert();
                        $scope.ifpopover = "";
                    });
        }
        $scope.objective_delPopover = function (item, index) {
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
                $scope.deleteObjectiveItem(item, index);
            }
        }

        $scope.hidePopove = function (item, index) {
            item.status = false;
            var elem = angular.element(document.getElementById(index));
            elem.popover('hide');

            $scope.ifpopover = "";
        }

        $scope.findObjectiveRecord = function () {
            $scope.errorFind = "";
            if (!$scope.search) {
                $scope.errorFind = "has-error has-feedback";
                $scope.findClose = "true";
                $timeout(function () {
                    $scope.errorFind = "";
                    $scope.findClose = "false";
                }, 5000);
            } else {
                console.log($scope.search);
                //console.log(objective_list);
                var url = 'bo/find';
                var srchVal = {"name": $scope.search};
                var promise = ajaxRequest.send(url, srchVal, 'POST');
                promise.then(
                        function (result) {
                            console.log(result);

                            if (result.status == "OK") {
                            } else {
                                console.log(result.error);
                                //alert(result.error);
                                $scope.alertmsg = true;
                                $scope.hideAlert();
                            }
                        });
                promise.catch(
                        function (e) {
                            console.log(e);
                            //alert(e);
                            $scope.alertmsg = true;
                            $scope.hideAlert();
                        });
            }
        };
        $scope.hideAllError = function () {
            $scope.errorName = "";
            $scope.nameClose = false;
            $scope.errorUnitName = "";
            $scope.selectClose = false;
        };


    }]);


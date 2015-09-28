
'use strict';
var dashMod = angular.module('MMI.initiative', ['MMI.ajaxService', 'ngStorage']);
dashMod.controller('InitiativeCtrl', ['$scope', 'ajaxRequest', '$q', '$timeout',
    function ($scope, ajaxRequest, $q, $timeout) {

        $scope.model_title = 'Add';
        $scope.initiative_list = {};
        $scope.item = {
            initiative_name: '',
            short_code: '',
            org_level: '',
            status: '',
            unit_name: ''
        };
        var unitList2 = [];
        var unit = ajaxRequest.send('lookups/bu/list');
        //console.log(data1);
        // var ajax = ajaxRequest.sendApi('data/list.json');
        unit.then(function (data1) {
            //console.log(unit);
            console.log(data1);
            unitList2 = data1;
            $scope.unitList = data1;
            $scope.loading = false;
        });

        $scope.loading = true;
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
            $scope.initiative_list = data;
            console.log(data);
            $scope.loading = false;
        });


        $scope.addInitiativeItem = function () {
            $scope.buttonShow = true;
            $scope.model_title = 'Add';
            $scope.item = {
                initiative_name: '',
                business_unit: '',
                description: '',
                status: '',
                unit_name: ''
            };
        };


        $scope.editInitiativeItem = function (item, index) {
            console.log(item);
            $scope.buttonShow = false;
            console.log('In editItem function - lets log item we have:');
            $scope.model_title = 'Edit';
            var unitName;
            for (var i = 0; i < unitList2.length; i++) {
                if (item.business_unit_id == unitList2[i].id) {
                    unitName = unitList2[i].displayName;
                }
            }
            $scope.item = {
                id: item.id,
                initiative_name: item.name,
                business_unit: item.unit_name,
                description: item.description,
                index: index,
                status: item.status,
                unit_name: item.unit_name

            };
            $('#initiative_Modal').modal({backdrop: true})
        };

        $scope.initiative_list = [];
        $scope.saveInitiativeItem = function () {

            if (!$scope.item.initiative_name && !$scope.item.business_unit) {
                $scope.errorName = "has-error has-feedback";
                $scope.nameClose = true;
                $scope.errorUnitName = "has-error has-feedback";
                $scope.selectClose = true;
            } else if (!$scope.item.initiative_name) {
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
                var url = 'bi/add';
                var values = {"business_unit_id": bussUnit, "description": $scope.item.description, "name": $scope.item.initiative_name};
                var promise = ajaxRequest.send(url, values, 'POST');
                promise.then(
                        function (result) {
                            if (result.status == "OK") {
                                $scope.saveLoading = false;
                                myobj.id = result.lastid;
                                myobj.name = $scope.item.initiative_name;
                                myobj.business_unit_id = "110";
                                myobj.description = $scope.item.description;
                                myobj.status = false;
                                myobj.unit_name = $scope.item.business_unit;
                                $scope.initiative_list.unshift(myobj);
                                $('#initiative_Modal').modal('hide');
                            } else {
                                console.log(data.error);
                                //alert(result.error);
                                $scope.alertmsg = true;
                                $scope.saveLoading = false;
                                $('#initiative_Modal').modal('hide');
                            }
                        });
                promise.catch(
                        function (e) {
                            console.log(e);
                            $scope.alertmsg = true;
                        });
            }
        };
        $scope.page = function () {
        };
        $scope.editInitiativeRecord = function (indexx) {
            var bussUnit = 0;
            if (!$scope.item.initiative_name && !$scope.item.business_unit) {
                $scope.errorName = "has-error has-feedback";
                $scope.nameClose = true;
                $scope.errorUnitName = "has-error has-feedback";
                $scope.selectClose = true;
                $scope.saveLoading = false;
                //alert("pls must fill all the field");
            } else if (!$scope.item.initiative_name) {
                $scope.errorName = "has-error has-feedback";
                $scope.nameClose = true;
            } else if (!$scope.item.business_unit) {
                $scope.errorUnitName = "has-error has-feedback";
                $scope.selectClose = true;
            } else {
                for (var i = 0; i < unitList2.length; i++) {

                    if (unitList2[i].displayName == $scope.item.business_unit) {
                        bussUnit = unitList2[i].id;
                    }
                }
                var url = 'bi/update';
                //Id needs to be included to the API call:
                var val = {"id": $scope.item.id, "business_unit_id": bussUnit, "description": $scope.item.description, "name": $scope.item.initiative_name, "unit_name": $scope.item.business_unit};
                var values = {"id": $scope.item.id, "business_unit_id": bussUnit, "description": $scope.item.description, "name": $scope.item.initiative_name};
                console.log("Going to send update. Values listed below:");
                var promise = ajaxRequest.send(url, values, 'POST');
                promise.then(
                        function (result) {
                            if (result.status == "OK") {
                                $scope.initiative_list.splice($scope.item.index, 1, val);
                                $scope.saveLoading = false;
                                $('#initiative_Modal').modal('hide');
                            } else {
                                console.log(result.error);
                                // alert(result.error);
                                $scope.alertmsg = true;
                                $scope.saveLoading = false;
                                $('#initiative_Modal').modal('hide');
                            }
                        });
                promise.catch(
                        function (e) {
                            console.log(e);
                            //alert(e);
                            $scope.alertmsg = true;
                            $scope.saveLoading = false;
                        });
            }
        }

        $scope.deleteInitiativeItem = function (items, indexs) {
            $scope.ifpopover = items.id;
            $scope.deleteLoader = items.id;
            var url = 'bi/delete';
            var dataId = {"id": items.id};
            var promise = ajaxRequest.send(url, dataId, 'POST');
            promise.then(
                    function (result) {
                        $scope.deleteLoader = false;
                        if (result.status == "OK") {
                            $scope.initiative_list.splice(indexs, 1);
                        } else {
                            console.log(result.error);
                            //alert(result.error);
                            $scope.alertmsg = true;
                        }
                    });
            promise.catch(
                    function (e) {
                        console.log(e);
                        //alert(e);
                        $scope.alertmsg = true;
                    });
        }
        $scope.initiative_delPopover = function (item, index) {
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
                $scope.deleteInitiativeItem(item, index);
            }
        }

        $scope.hidePopove = function (item, index) {
            item.status = false;
            var elem = angular.element(document.getElementById(index));
            elem.popover('hide');

            $scope.ifpopover = "";
        }

        $scope.findInitiativeRecord = function () {
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
                //console.log(initiative_list);
                var url = 'bi/find';
                var srchVal = {"id": $scope.search};
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
        }


        $scope.hideAlert = function () {
            $timeout(function () {
                $scope.alertmsg = false;
            }, 100000);
        }
        $scope.errorHideName = function () {
            $scope.errorName = "";
            $scope.nameClose = false;
        }
        $scope.errorHideSelect = function () {
            $scope.errorUnitName = "";
            $scope.selectClose = false;
        }
        $scope.findError = function () {
            $scope.errorFind = "";
            $scope.findClose = false;
        }

    }]);
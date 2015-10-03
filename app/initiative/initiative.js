
'use strict';
var dashMod = angular.module('MMI.initiative', ['MMI.ajaxService', 'ngStorage']);
dashMod.controller('InitiativeCtrl', ['$scope', 'ajaxRequest', '$q', '$timeout',
    function ($scope, ajaxRequest, $q, $timeout) {
        window.document.title = "Business Initiative";
        $scope.model_title = 'Add Business Initiative';
        $scope.initiative_list = {};
        $scope.item = {
            initiative_name: '',
            parent_initiative: '',
            description: '',
            status: '',
            parent_name: ''
        };

        $scope.loading = true;
        var parentList2 = [];
        var parent = ajaxRequest.send('lookups/bi/parentlist');
        //console.log(data1);
        // var ajax = ajaxRequest.sendApi('data/list.json');
        parent.then(function (data1) {
            //console.log(unit);
            console.log(data1);
            parentList2 = data1;
            $scope.parentList = data1;
            $scope.loading = false;

            var ajax = ajaxRequest.send('bi/list');
            // var ajax = ajaxRequest.sendApi('data/list.json');
            ajax.then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].status = false;
                    for (var j = 0; j < parentList2.length; j++) {
                        if (data[i].parent_initiative_id == parentList2[j].initiativeId) {
                            data[i].parent_name = parentList2[j].initiativeName;
                        }
                    }
                }
                $scope.initiative_list = data;
                console.log(data);
                $scope.loading = false;
            });
        });






        $scope.addInitiativeItem = function () {
            $scope.hideAllError();
            $scope.buttonShow = true;
            $scope.model_title = 'Add Business Initiative';
            $scope.item = {
                initiative_name: '',
                parent_initiative: '',
                description: '',
                status: '',
                parent_name: ''
            };
        };


        $scope.editInitiativeItem = function (item, index) {
            $scope.hideAllError();
            console.log(item);
            $scope.buttonShow = false;
            console.log('In editItem function - lets log item we have:');
            $scope.model_title = 'Edit Business Initiative';
            var unitName;
            for (var i = 0; i < parentList2.length; i++) {
                if (item.parent_initiative_id == parentList2[i].id) {
                    unitName = parentList2[i].initiativeName;
                }
            }
            $scope.item = {
                id: item.id,
                initiative_name: item.name,
                parent_initiative: item.parent_name,
                description: item.description,
                index: index,
                status: item.status,
                parent_name: item.parent_name

            };
            $('#initiative_Modal').modal({backdrop: true})
        };

        $scope.initiative_list = [];
        $scope.saveInitiativeItem = function () {

            if (!$scope.item.initiative_name && !$scope.item.parent_initiative) {
                $scope.errorName = "has-error has-feedback";
                $scope.nameClose = true;
                $scope.errorUnitName = "has-error has-feedback";
                $scope.selectClose = true;
            } else if (!$scope.item.initiative_name) {
                $scope.errorName = "has-error has-feedback";
                $scope.nameClose = true;
            } else if (!$scope.item.parent_initiative) {
                $scope.errorUnitName = "has-error has-feedback";
                $scope.selectClose = true;
            } else {
                $scope.saveLoading = true;
                var parent_id = 0;
                for (var i = 0; i < parentList2.length; i++) {
                    if (parentList2[i].initiativeName == $scope.item.parent_initiative) {
                        parent_id = parentList2[i].initiativeId
                    }
                }

                console.log("parent_id :- " + parent_id);
                console.log("parent_Name :- " + $scope.item.initiative_name);
                console.log("parent_desc:- " + $scope.item.description);
                console.log("parent_parent_initiative:- " + $scope.item.parent_initiative);
                var myobj = {};
                var url = 'bi/add';
                var values = {"name": $scope.item.initiative_name, "parent_initiative_id": parseInt(parent_id), "description": $scope.item.description};
                var promise = ajaxRequest.send(url, values, 'POST');
                promise.then(
                        function (result) {
                            if (result.status == "OK") {
                                $scope.saveLoading = false;
                                myobj.id = result.lastid;
                                myobj.name = $scope.item.initiative_name;
                                myobj.parent_initiative_id = parent_id;
                                myobj.description = $scope.item.description;
                                myobj.status = false;
                                myobj.parent_name = $scope.item.parent_initiative;
                                $scope.initiative_list.unshift(myobj);
                                $('#initiative_Modal').modal('hide');
                            } else {
                                console.log(data.error);
                                //alert(result.error);
                                $scope.alertmsg = true;
                                $scope.saveLoading = false;
                                $scope.hideAlert();
                                $('#initiative_Modal').modal('hide');
                            }
                        });
                promise.catch(
                        function (e) {
                            console.log(e);
                            $scope.alertmsg = true;
                            $scope.saveLoading = false;
                            $scope.hideAlert();
                        });
            }
        };
        $scope.page = function () {
        };
        $scope.editInitiativeRecord = function (indexx) {
            var parent_id = 0;
            if (!$scope.item.initiative_name && !$scope.item.parent_initiative) {
                $scope.errorName = "has-error has-feedback";
                $scope.nameClose = true;
                $scope.errorUnitName = "has-error has-feedback";
                $scope.selectClose = true;
                $scope.saveLoading = false;
                //alert("pls must fill all the field");
            } else if (!$scope.item.initiative_name) {
                $scope.errorName = "has-error has-feedback";
                $scope.nameClose = true;
            } else if (!$scope.item.parent_initiative) {
                $scope.errorUnitName = "has-error has-feedback";
                $scope.selectClose = true;
            } else {
                $scope.saveLoading = true;
                for (var i = 0; i < parentList2.length; i++) {

                    if (parentList2[i].initiativeName == $scope.item.parent_initiative) {
                        parent_id = parentList2[i].initiativeId;
                    }
                }
                var url = 'bi/update';
                //Id needs to be included to the API call:
                var val = {"id": $scope.item.id, "parent_initiative_id": parent_id, "description": $scope.item.description, "name": $scope.item.initiative_name, "parent_name": $scope.item.parent_initiative, "status": false};
                var values = {"id": $scope.item.id, "parent_initiative_id": parent_id, "name": $scope.item.initiative_name, "description": $scope.item.description};
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
                                $scope.hideAlert();
                                $('#initiative_Modal').modal('hide');
                            }
                        });
                promise.catch(
                        function (e) {
                            console.log(e);
                            //alert(e);
                            $scope.alertmsg = true;
                            $scope.saveLoading = false;
                            $scope.hideAlert();
                        });
            }
        }

        $scope.deleteInitiativeItem = function (items, indexs) {
            console.log(items);
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
                            $('#DelError_Modal').modal('show');
                            $scope.delErr = result.error;
                            //alert(result.error);
                            //$scope.alertmsg = true;
                            //$scope.hideAlert();
                            $scope.ifpopover = "";
                        }
                    });
            promise.catch(
                    function (e) {
                        console.log(e);
                        //alert(e);
                        $('#DelError_Modal').modal('show');
                        $scope.delErr = e;
                        //$scope.alertmsg = true;
                        $scope.deleteLoader = false;
                        //$scope.hideAlert();
                        $scope.ifpopover = "";
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
        }

        $scope.hideAllError = function () {
            $scope.errorName = "";
            $scope.nameClose = false;
            $scope.errorUnitName = "";
            $scope.selectClose = false;
        }
        $scope.hideAlert = function () {
            $timeout(function () {
                $scope.alertmsg = false;
            }, 10000);
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

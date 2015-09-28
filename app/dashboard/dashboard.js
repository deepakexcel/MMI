'use strict';
var dashMod = angular.module('MMI.dashboard', ['MMI.ajaxService', 'ngStorage']);
dashMod.controller('DashboardCtrl', ['$scope', 'ajaxRequest', '$q', '$timeout',
    function ($scope, ajaxRequest, $q, $timeout) {

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
        var ajax = ajaxRequest.send('bu/list');
        // var ajax = ajaxRequest.sendApi('data/list.json');
        ajax.then(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].status = false;
            }
            $scope.list = data;
            $scope.loading = false;
        });
        $scope.addItem = function () {
            $scope.buttonShow = true;
            $scope.model_title = 'Add';
            $scope.item = {
                name: '',
                short_code: '',
                org_level: '',
                status: ''
            };
        };
        $scope.editItem = function (item, index) {
            $scope.buttonShow = false;
            console.log('In editItem function - lets log item we have:');
            $scope.model_title = 'Edit';
            //Just a question - why do you create a "new" item and not pass the item you got?
            //Problem was caused by you not passing the id, so the API does not know which
            //item to update
            //I stuck to your approach, and simply added the id back in
            var orgLevel = parseInt(item.org_level);
            $scope.item = {
                id: item.id,
                name: item.name,
                short_code: item.short_code,
                org_level: orgLevel,
                index: index,
                status: item.status
            };
            $('#unit_Modal').modal({backdrop: true})
        };
        $scope.list = [];
        $scope.saveItem = function () {

            if (!$scope.item.short_code && !$scope.item.name && !$scope.item.org_level) {
                $scope.errorShortCode = "has-error has-feedback";
                $scope.shortCodeClose = true;
                $scope.errorUnitName = "has-error has-feedback";
                $scope.unitNameClose = true;
                $scope.errorOrgLevel = "has-error has-feedback";
                $scope.orgClose = true;
            } else if (!$scope.item.short_code) {
                $scope.errorShortCode = "has-error has-feedback";
                $scope.shortCodeClose = true;
            } else if (!$scope.item.name) {
                $scope.errorUnitName = "has-error has-feedback";
                $scope.unitNameClose = true;
            } else if (!$scope.item.org_level) {
                $scope.errorOrgLevel = "has-error has-feedback";
                $scope.orgClose = true;
            } else {
                $scope.saveLoading = true;
                var myobj = {};
                var url = 'bu/add';
                var values = {"name": $scope.item.name, "short_code": $scope.item.short_code, "org_level": $scope.item.org_level, };
                var promise = ajaxRequest.send(url, values, 'POST');
                promise.then(
                        function (result) {
                            if (result.status == "OK") {
                                $scope.saveLoading = false;
                                myobj.id = result.lastid;
                                myobj.name = $scope.item.name;
                                myobj.short_code = $scope.item.short_code;
                                myobj.org_level = $scope.item.org_level;
                                myobj.status = false;
                                $scope.list.unshift(myobj);
                                $('#unit_Modal').modal('hide');
                            } else {
                                console.log(data.error);
                                $scope.unitAlertMsg = true;
                                $scope.saveLoading = false;
                                $('#unit_Modal').modal('hide');
                            }
                        });
                promise.catch(
                        function (e) {
                            console.log(e);
                            $scope.unitAlertMsg = true;
			    $scope.saveLoading = false;
                        });
            }
        };
        $scope.page = function () {
        };
        $scope.editRecord = function (indexx) {
            if (!$scope.item.short_code && !$scope.item.name && !$scope.item.org_level) {
                $scope.errorShortCode = "has-error has-feedback";
                $scope.shortCodeClose = true;
                $scope.errorUnitName = "has-error has-feedback";
                $scope.unitNameClose = true;
                $scope.errorOrgLevel = "has-error has-feedback";
                $scope.orgClose = true;
            } else if (!$scope.item.short_code) {
                $scope.errorShortCode = "has-error has-feedback";
                $scope.shortCodeClose = true;
            } else if (!$scope.item.name) {
                $scope.errorUnitName = "has-error has-feedback";
                $scope.unitNameClose = true;
            } else if (!$scope.item.org_level) {
                $scope.errorOrgLevel = "has-error has-feedback";
                $scope.orgClose = true;
            } else {
                $scope.saveLoading = true;
                var url = 'bu/update';
                //Id needs to be included to the API call:
                var values = {"id": $scope.item.id, "name": $scope.item.name, "short_code": $scope.item.short_code, "org_level": $scope.item.org_level};
                console.log("Going to send update. Values listed below:");
                var promise = ajaxRequest.send(url, values, 'POST');
                promise.then(
                        function (result) {
                            if (result.status == "OK") {
                                $scope.list.splice($scope.item.index, 1, values);
                                $scope.saveLoading = false;
                                $('#unit_Modal').modal('hide');
                            } else {
                                console.log(result.error);
                                $scope.unitAlertMsg = true;
                                $scope.saveLoading = false;
                                $('#unit_Modal').modal('hide');
                            }
                        });
                promise.catch(
                        function (e) {
                            console.log(e);
                            $scope.unitAlertMsg = true;
                            $scope.saveLoading = false;
                        });
            }
        }

        $scope.deleteItem = function (items, indexs) {
            $scope.ifpopover = items.id;
            $scope.deleteLoader = items.id;
            var url = 'buu/delete';
            var dataId = {"id": items.id};
            var promise = ajaxRequest.send(url, dataId, 'POST');
            promise.then(
                    function (result) {
                        $scope.deleteLoader = false;
                        if (result.status == "OK") {
                            $scope.list.splice(indexs, 1);
                        } else {
                            console.log(result.error);
                            $scope.unitAlertMsg = true;
			    $scope.deleteLoader = false;
                        }
                    });
            promise.catch(
                    function (e) {
                        console.log(e);
                        $scope.unitAlertMsg = true;
			$scope.deleteLoader = false;
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

        $scope.hideAlertUnit = function () {
            $timeout(function () {
                $scope.unitAlertMsg = false;
            }, 100000);
        }
        $scope.errorHideShort = function () {
            $scope.errorShortCode = "";
            $scope.shortCodeClose = false;
        }
        $scope.errorHideUnit = function () {
            $scope.errorUnitName = "";
            $scope.unitNameClose = false;
        }
        $scope.errorHideOrg = function () {
            $scope.errorOrgLevel = "";
            $scope.orgClose = false;
        }

    }]);

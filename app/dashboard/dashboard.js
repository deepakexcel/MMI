'use strict';
var dashMod = angular.module('MMI.dashboard', ['MMI.ajaxService', 'ngStorage']);
dashMod.controller('DashboardCtrl', ['$scope', 'ajaxRequest', '$q', '$timeout', '$rootScope',
    function ($scope, ajaxRequest, $q, $timeout, $rootScope) {

//        if (!$localStorage.user) {
//            $state.go('main.login')
//        }
        window.document.title = "Business Unit";
        $scope.model_title = 'Add Business Unit';
        $scope.list = {};
        $scope.item = {
            name: '',
            short_code: '',
            org_level: '',
            status: ''
        };
        $scope.limits = [{
                value: '5',
                text: '5'
            }, {
                value: '10',
                text: '10'
            }];
        $scope.icon2 = "glyphicon glyphicon-chevron-down";
        $scope.pageSize = 5;
        $scope.order = "ASC";
        $scope.first = 1;
        $scope.last = 2;
        $scope.active = ['active', '0', '0'];
        $scope.loading = true;
        $scope.pageNumber = 1;
        var ajax = ajaxRequest.apiGet('grids/bu/1/id/ASC/5/2?p1=10&p2-90');
        // var ajax = ajaxRequest.sendApi('data/list.json');
        ajax.then(function (data) {
            console.log(data);
            var data=data.data;
            for (var i = 0; i < data.length; i++) {
                data[i].status = false;
            }
            $scope.list = data;

            $scope.loading = false;
        });

        $scope.nextPage = function () {


            var page = $scope.pageNumber;
            var size = $scope.pageSize;
            var order = $scope.order;
            if (page == 2) {
                console.log("NO next Page");
            } else {
                $scope.loading = true;
                page = page + 1;
                $scope.active = ['0', '0', '0'];
                $scope.active[page - 1] = "active";
                $scope.pageNumber = $scope.pageNumber + 1;
                var ajax = ajaxRequest.send('grids/bu/' + page + '/id/' + order + '/' + size + '/');
                // var ajax = ajaxRequest.sendApi('data/list.json');
                ajax.then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].status = false;
                    }
                    $scope.list = data;

                    $scope.loading = false;
                });

            }


        };

        $scope.prevPage = function () {

            var page = $scope.pageNumber;
            if (page == 1) {
                console.log("no previous page");
            } else {
                $scope.loading = true;
                page = page - 1;
                $scope.active = ['0', '0'];
                $scope.active[page - 1] = "active";
                $scope.pageNumber = $scope.pageNumber - 1;
                var ajax = ajaxRequest.send('grids/bu/' + page + '/id/ASC/5');
                // var ajax = ajaxRequest.sendApi('data/list.json');
                ajax.then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].status = false;
                    }
                    $scope.list = data;
                    $scope.loading = false;
                });
            }


        };
        $scope.goPage = function (pageN) {
            $scope.loading = true;
            console.log(pageN);
            $scope.active = ['0', '0', '0'];
            $scope.active[pageN - 1] = "active";

            var ajax = ajaxRequest.send('grids/bu/' + pageN + '/id/ASC/5');
            // var ajax = ajaxRequest.sendApi('data/list.json');
            ajax.then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].status = false;
                }
                $scope.list = data;
                $scope.loading = false;
            });

        };
        $scope.sortPage = function (column) {
            if (column == 'short_code') {
                $scope.show1 = 'a';
            } else {
                $scope.show2 = 'a';
            }
            if ($scope.icon2 === "glyphicon glyphicon-chevron-down") {
                $scope.icon2 = "glyphicon glyphicon-chevron-up";
            } else {
                $scope.icon2 = "glyphicon glyphicon-chevron-down";
            }

            var column = column;
            var order = $scope.order;
            var size = $scope.pageSize;
            if (order === "ASC") {
                $scope.order = "DESC";
                order = $scope.order;
                //console.log(order);
            } else {
                $scope.order = "ASC";
                order = "ASC";
            }
            $scope.loading = true;
            var ajax = ajaxRequest.send('grids/bu/1/' + column + '/' + order + '/5');
            ajax.then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].status = false;
                }
                $scope.list = data;
                $scope.loading = false;
            });

        };
        $scope.update = function (value) {
            var order = $scope.order;
            console.log($scope.pageSize);
            var size = $scope.pageSize;
            $scope.loading = true;
            var ajax = ajaxRequest.send('grids/bu/1/id/' + order + '/' + size + '/');
            ajax.then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].status = false;
                }
                $scope.list = data;
                $scope.loading = false;
            });
        };

        $scope.addCapabilitiesItem = function () {
            $scope.hideAllError();
            $scope.buttonShow = true;
            $scope.model_title = 'Add Business Capabilities';
            $scope.item = {
                capabilities_name: '',
                description: '',
                status: ''
            };
        };
        $scope.addItem = function () {
            $scope.hideAllError();
            $scope.buttonShow = true;
            $scope.model_title = 'Add Business Unit';
            $scope.item = {
                name: '',
                short_code: '',
                org_level: '',
                status: ''
            };
        };
        $scope.editItem = function (item, index) {
            console.log(item);
            $scope.hideAllError();
            $scope.buttonShow = false;
            console.log('In editItem function - lets log item we have:');
            $scope.model_title = 'Edit Business Unit';
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
            $scope.$emit('modal-show');
        };
        $scope.list = [];
//        $scope.saveItem = function () {
//
//            if (!$scope.item.short_code && !$scope.item.name && !$scope.item.org_level) {
//                $scope.errorShortCode = "has-error has-feedback";
//                $scope.shortCodeClose = true;
//                $scope.errorUnitName = "has-error has-feedback";
//                $scope.unitNameClose = true;
//                $scope.errorOrgLevel = "has-error has-feedback";
//                $scope.orgClose = true;
//            } else if (!$scope.item.short_code) {
//                $scope.errorShortCode = "has-error has-feedback";
//                $scope.shortCodeClose = true;
//            } else if (!$scope.item.name) {
//                $scope.errorUnitName = "has-error has-feedback";
//                $scope.unitNameClose = true;
//            } else if (!$scope.item.org_level) {
//                $scope.errorOrgLevel = "has-error has-feedback";
//                $scope.orgClose = true;
//            } else {
//                $scope.saveLoading = true;
//                var myobj = {};
//                var url = 'bu/add';
//                var values = {"name": $scope.item.name, "short_code": $scope.item.short_code, "org_level": $scope.item.org_level, };
//                var promise = ajaxRequest.send(url, values, 'POST');
//                promise.then(
//                        function (result) {
//                            if (result.status == "OK") {
//                                $scope.saveLoading = false;
//                                myobj.id = result.lastid;
//                                myobj.name = $scope.item.name;
//                                myobj.short_code = $scope.item.short_code;
//                                myobj.org_level = $scope.item.org_level;
//                                myobj.status = false;
//                                $scope.list.unshift(myobj);
//                                $('#unit_Modal').modal('hide');
//                            } else {
//                                console.log(data.error);
//                                $scope.unitAlertMsg = true;
//                                $scope.saveLoading = false;
//                                $scope.hideAlert();
//                                $('#unit_Modal').modal('hide');
//                            }
//                        });
//                promise.catch(
//                        function (e) {
//                            console.log(e);
//                            $scope.unitAlertMsg = true;
//                            $scope.saveLoading = false;
//                            $scope.hideAlert();
//                        });
//            }
//        };
        $scope.page = function () {
        };
        $scope.$on('modal-close', function (ev, data) {
            console.log(data);
            if (!data.type)
            {
                $scope.list.splice($scope.item.index, 1, data.data);
            }
            else
                $scope.list.unshift(data.data);

        });

        $scope.deleteItem = function (items, indexs) {
            $scope.ifpopover = items.id;
            $scope.deleteLoader = items.id;
            var url = 'bu/delete';
            var dataId = {"id": items.id};
            var promise = ajaxRequest.send(url, dataId, 'POST');
            promise.then(
                    function (result) {
                        $scope.deleteLoader = false;
                        if (result.status == "OK") {
                            $scope.list.splice(indexs, 1);
                        } else {
                            console.log(result.error);
                            $('#DelError_Modal').modal('show');
                            $scope.delErr = result.error;
                            //$scope.unitAlertMsg = true;
                            $scope.deleteLoader = false;
                            //$scope.hideAlert();
                            $scope.ifpopover = "";
                        }
                    });
            promise.catch(
                    function (e) {
                        console.log(e);
                        $('#DelError_Modal').modal('show');
                        $scope.delErr = e;
                        //$scope.unitAlertMsg = true;
                        $scope.deleteLoader = false;
                        //$scope.hideAlert();
                        $scope.ifpopover = "";
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

        $scope.hideAllError = function () {
            $scope.errorShortCode = "";
            $scope.shortCodeClose = false;
            $scope.errorUnitName = "";
            $scope.unitNameClose = false;
            $scope.errorOrgLevel = "";
            $scope.orgClose = false;
        }

        $scope.hideAlertUnit = function () {
            $timeout(function () {
                $scope.unitAlertMsg = false;
            }, 10000);
        }


    }]);

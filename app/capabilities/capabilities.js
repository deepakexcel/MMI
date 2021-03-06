'use strict';
var dashMod = angular.module('MMI.capabilities', ['MMI.ajaxService', 'ngStorage']);
dashMod.controller('CapabilitiesCtrl', ['$scope', 'ajaxRequest', '$q', '$timeout',
    function($scope, ajaxRequest, $q, $timeout) {
        window.document.title = "Business Capabilities";
        $scope.model_title = 'Add Business Capabilities';
        $scope.initiative_list = {};
        $scope.item = {
            capabilities_name: '',
            description: '',
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
        $scope.active = ['active', '0', '0'];
        $scope.pageNumber = 1;
        $scope.first = 1;
        $scope.middle = 2;
        $scope.last = 3;
        $scope.order = "ASC";

        $scope.loading = true;


        var ajax = ajaxRequest.send('grids/bc/1/id/ASC/5');
        // var ajax = ajaxRequest.sendApi('data/list.json');
        ajax.then(function(data) {
            for (var i = 0; i < data.length; i++) {
                data[i].status = false;
            }
            $scope.capabilities_list = data;
            console.log(data);
            $scope.loading = false;
        });

        $scope.nextPage = function() {
            var order = $scope.order;
            var size = $scope.pageSize;
            var page = $scope.pageNumber;
            if (page == 3) {
                console.log("NO next Page");
            } else {
                $scope.loading = true;
                page = page + 1;
                $scope.active = ['0', '0', '0'];
                $scope.active[page - 1] = "active";
                $scope.pageNumber = $scope.pageNumber + 1;
                var ajax = ajaxRequest.send('grids/bc/' + page + '/id/' + order + '/' + size + '/');
                // var ajax = ajaxRequest.sendApi('data/list.json');
                ajax.then(function(data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].status = false;
                    }
                    $scope.capabilities_list = data;
                    console.log(data);
                    $scope.loading = false;
                });

            }


        };

        $scope.prevPage = function() {
            var order = $scope.order;
            var size = $scope.pageSize;
            var page = $scope.pageNumber;
            if (page == 1) {
                console.log("no previous page");
            } else {
                $scope.loading = true;
                page = page - 1;
                $scope.active = ['0', '0', '0'];
                $scope.active[page - 1] = "active";
                $scope.pageNumber = $scope.pageNumber - 1;
                var ajax = ajaxRequest.send('grids/bc/' + page + '/id/' + order + '/' + size + '/');
                // var ajax = ajaxRequest.sendApi('data/list.json');
                ajax.then(function(data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].status = false;
                    }
                    $scope.capabilities_list = data;
                    console.log(data);
                    $scope.loading = false;
                });
            }


        };
        $scope.goPage = function(pageN) {
            var order = $scope.order;
            $scope.active = ['0', '0', '0'];
            $scope.active[pageN - 1] = "active";
            $scope.loading = true;
            var size = $scope.pageSize;
            console.log(pageN);
            var ajax = ajaxRequest.send('grids/bc/' + pageN + '/id/' + order + '/' + size + '/');
            // var ajax = ajaxRequest.sendApi('data/list.json');
            ajax.then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].status = false;
                }
                $scope.capabilities_list = data;
                console.log(data);
                $scope.loading = false;
            });

        };
        $scope.update = function(value) {
            var order = $scope.order;
            console.log($scope.pageSize);
            var size = $scope.pageSize;
            $scope.loading = true;
            var ajax = ajaxRequest.send('grids/bc/1/id/' + order + '/' + size + '/');
            // var ajax = ajaxRequest.sendApi('data/list.json');
            ajax.then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].status = false;
                }
                $scope.capabilities_list = data;
                console.log(data);
                $scope.loading = false;
            });

        };

        $scope.addCapabilitiesItem = function() {
            $scope.hideAllError();
            $scope.buttonShow = true;
            $scope.model_title = 'Add Business Capabilities';
            $scope.item = {
                capabilities_name: '',
                description: '',
                status: ''
            };
        };
        $scope.sortPage = function(column) {
            if (column == 'name') {
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
            var ajax = ajaxRequest.send('grids/bc/1/' + column + '/' + order + '/' + size + '/');
            // var ajax = ajaxRequest.sendApi('data/list.json');
            ajax.then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].status = false;
                }
                $scope.capabilities_list = data;
                console.log(data);
                $scope.loading = false;
            });

        };
        $scope.editCapabilitiesItem = function(item, index) {
            $scope.hideAllError();
            console.log(item);
            $scope.buttonShow = false;
            console.log('In editItem function - lets log item we have:');
            $scope.model_title = 'Edit Business Capabilities';
            var unitName;

            $scope.item = {
                id: item.id,
                capabilities_name: item.name,
                description: item.description,
                index: index,
                status: item.status
            };
            $('#capabilities_Modal').modal({
                backdrop: true
            });
        };

        $scope.capabilities_list = [];
        $scope.saveCapabilitiesItem = function() {
            if (!$scope.item.capabilities_name) {
                $scope.errorName = "has-error has-feedback";
                $scope.nameClose = true;

            } else {
                $scope.saveLoading = true;
                console.log("parent_Name :- " + $scope.item.capabilities_name);
                console.log("parent_desc:- " + $scope.item.description);

                var myobj = {};
                var url = 'bc/add';
                var values = {
                    "name": $scope.item.capabilities_name,
                    "description": $scope.item.description
                };
                var promise = ajaxRequest.send(url, values, 'POST');
                promise.then(
                    function(result) {
                        if (result.status == "OK") {
                            $scope.saveLoading = false;
                            myobj.id = result.lastid;
                            myobj.name = $scope.item.capabilities_name;
                            myobj.description = $scope.item.description;
                            myobj.status = false;
                            $scope.capabilities_list.unshift(myobj);
                            $('#capabilities_Modal').modal('hide');
                        } else {
                            console.log(data.error);
                            //alert(result.error);
                            $scope.alertmsg = true;
                            $scope.hideAlert();
                            $scope.saveLoading = false;
                            $('#capabilities_Modal').modal('hide');
                        }
                    });
                promise.catch(
                    function(e) {
                        console.log(e);
                        $scope.alertmsg = true;
                        $scope.saveLoading = false;
                        $scope.hideAlert();
                    });
            }
        };

        $scope.editCapabilitiesRecord = function(indexx) {
            console.log($scope.item);
            if (!$scope.item.capabilities_name) {
                $scope.errorName = "has-error has-feedback";
                $scope.nameClose = true;
            } else {
                $scope.saveLoading = true;

                var url = 'bc/update';
                //Id needs to be included to the API call:
                var val = {
                    "id": $scope.item.id,
                    "name": $scope.item.capabilities_name,
                    "description": $scope.item.description,
                    "status": false
                };
                var values = {
                    "id": $scope.item.id,
                    "name": $scope.item.capabilities_name,
                    "description": $scope.item.description
                };
                console.log("Going to send update. Values listed below:");
                var promise = ajaxRequest.send(url, values, 'POST');
                promise.then(
                    function(result) {
                        if (result.status == "OK") {
                            $scope.capabilities_list.splice($scope.item.index, 1, val);
                            $scope.saveLoading = false;
                            $('#capabilities_Modal').modal('hide');
                        } else {
                            console.log(result.error);
                            // alert(result.error);
                            $scope.alertmsg = true;
                            $scope.saveLoading = false;
                            $scope.hideAlert();
                            $('#capabilities_Modal').modal('hide');
                        }
                    });
                promise.catch(
                    function(e) {
                        console.log(e);
                        //alert(e);
                        $scope.alertmsg = true;
                        $scope.saveLoading = false;
                        $scope.hideAlert();
                    });
            }
        }

        $scope.deleteCapabilitiesItem = function(items, indexs) {
            console.log(items);
            $scope.ifpopover = items.id;
            $scope.deleteLoader = items.id;
            var url = 'bc/delete';
            var dataId = {
                "id": items.id
            };
            var promise = ajaxRequest.send(url, dataId, 'POST');
            promise.then(
                function(result) {
                    $scope.deleteLoader = false;
                    if (result.status == "OK") {
                        $scope.capabilities_list.splice(indexs, 1);
                    } else {
                        console.log(result.error);
                        $('#DelError_Modal').modal('show');
                        $scope.delErr = result.error;
                        //alert(result.error);
                        //$scope.alertmsg = true;
                        //$scope.hideAlert();
                        $scope.ifpopover = "";
                        $scope.deleteLoader = false;
                    }
                });
            promise.catch(
                function(e) {
                    console.log(e);
                    $('#DelError_Modal').modal('show');
                    $scope.delErr = e;
                    //alert(e);
                    // $scope.alertmsg = true;
                    $scope.deleteLoader = false;
                    //$scope.hideAlert();
                    $scope.ifpopover = "";
                });
        }
        $scope.capabilities_delPopover = function(item, index) {
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
                $scope.deleteCapabilitiesItem(item, index);
            }
        }

        $scope.hidePopove = function(item, index) {
            item.status = false;
            var elem = angular.element(document.getElementById(index));
            elem.popover('hide');

            $scope.ifpopover = "";
        }

        $scope.findCapabilitiesRecord = function() {
            $scope.errorFind = "";
            if (!$scope.search) {
                $scope.errorFind = "has-error has-feedback";
                $scope.findClose = "true";
                $timeout(function() {
                    $scope.errorFind = "";
                    $scope.findClose = "false";
                }, 5000);
            } else {
                console.log($scope.search);
                //console.log(initiative_list);
                var url = 'bc/find';
                var srchVal = {
                    "id": $scope.search
                };
                var promise = ajaxRequest.send(url, srchVal, 'POST');
                promise.then(
                    function(result) {
                        console.log(result);

                        if (result.status == "OK") {} else {
                            console.log(result.error);
                            //alert(result.error);
                            $scope.alertmsg = true;
                            $scope.hideAlert();
                        }
                    });
                promise.catch(
                    function(e) {
                        console.log(e);
                        //alert(e);
                        $scope.alertmsg = true;
                        $scope.hideAlert();
                    });
            }
        }
        $scope.hideAllError = function() {
            $scope.errorName = "";
            $scope.nameClose = false;

        }
        $scope.hideAlert = function() {
            $timeout(function() {
                $scope.alertmsg = false;
            }, 3000);
        }
        $scope.errorHideName = function() {
            $scope.errorName = "";
            $scope.nameClose = false;
        }

        $scope.findError = function() {
            $scope.errorFind = "";
            $scope.findClose = false;
        }

    }
]);

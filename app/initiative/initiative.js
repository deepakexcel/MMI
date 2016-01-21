'use strict';
var dashMod = angular.module('MMI.initiative', ['MMI.ajaxService', 'ngStorage']);
dashMod.controller('InitiativeCtrl', ['$scope', 'ajaxRequest', '$q', '$timeout', '$rootScope', '$localStorage',
    function ($scope, ajaxRequest, $q, $timeout, $rootScope, $localStorage) {
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
        $scope.limits = [{
                value: '5',
                text: '5'
            }, {
                value: '10',
                text: '10'
            }];
        $scope.active = ['active', '0', '0', ''];
        $scope.icon = "glyphicon glyphicon-chevron-down";
        $scope.pageNumber = 1;
        $scope.first = 1;
        $scope.middle = 2;
        $scope.last = 3;
        $scope.order = "ASC";
        $scope.loading = true;
        var parentList2 = [];
        var parent = ajaxRequest.send('lookups/bi/parentlist');
        parent.then(function (data1) {
            console.log(data1);
            parentList2 = data1;
            $scope.parentList = data1;
            $scope.loading = false;

            var ajax = ajaxRequest.send('grids/bi/1/id/ASC/5');
            ajax.then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].status = false;
                    var arr = [];
                    for (var j = 0; j < parentList2.length; j++) {
                        if (data[i].parent_initiative_id == parentList2[j].initiativeId) {
                            data[i].parent_name = parentList2[j].initiativeName;
                            arr[i] = parentList2[j].initiativeName;
                            console.log(arr[i]);
                            console.log($scope.pageSize);
                        }
                    }
                }

                $scope.initiative_list = data;
                console.log(data);
                $scope.loading = false;
            });
        });
        $scope.nextPage = function () {
            $scope.loading = true;
            var size = $scope.pageSize;
            var page = $scope.pageNumber;
            console.log(page);
            if (page === 2)
            {
                $scope.first = 2;
                $scope.middle = 3;
                $scope.last = 4;
                $scope.active[0] = " ";
                $scope.active[1] = "active";
                $scope.active[2] = " ";
            }

            else if (page == 3)
            {
                $scope.active[0] = " ";
                $scope.active[1] = "";
                $scope.active[2] = "active";
            }
            else
            {
                $scope.active[0] = " ";
                $scope.active[1] = "active";
            }
            if (page == 4) {
                console.log("NO next Page");
                $scope.active[1] = "";

            } else {

                page = page + 1;

                $scope.pageNumber = $scope.pageNumber + 1;
                var parentList2 = [];
                var parent = ajaxRequest.send('lookups/bi/parentlist');
                parent.then(function (data1) {
                    parentList2 = data1;
                    $scope.parentList = data1;
                    var ajax = ajaxRequest.send('grids/bi/' + page + '/id/ASC/5');
                    ajax.then(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            data[i].status = false;
                            var arr = [];
                            for (var j = 0; j < parentList2.length; j++) {
                                if (data[i].parent_initiative_id == parentList2[j].initiativeId) {
                                    data[i].parent_name = parentList2[j].initiativeName;
                                    arr[i] = parentList2[j].initiativeName;


                                }
                            }
                        }
                        $scope.initiative_list = data;

                        console.log(data);
                        $scope.loading = false;
                    });
                });
            }


        };

        $scope.prevPage = function () {

            $scope.loading = true;
            var size = $scope.pageSize;
            var order = $scope.order;
            var page = $scope.pageNumber;
            if (page === 3)
            {
                $scope.first = 2;
                $scope.middle = 3;
                $scope.last = 4;
            }
            if (page == 1) {
                console.log("no previous page");
            } else {
                $scope.active[page - 1] = " ";
                page = page - 1;
                $scope.active[page - 1] = "active";
                $scope.pageNumber = $scope.pageNumber - 1;
                var parentList2 = [];
                var parent = ajaxRequest.send('lookups/bi/parentlist');
                parent.then(function (data1) {
                    parentList2 = data1;
                    var ajax = ajaxRequest.send('grids/bi/' + page + '/id/' + order + '/' + size + '/');
                    ajax.then(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            data[i].status = false;
                            var arr = [];
                            for (var j = 0; j < parentList2.length; j++) {
                                if (data[i].parent_initiative_id == parentList2[j].initiativeId) {
                                    data[i].parent_name = parentList2[j].initiativeName;
                                    arr[i] = parentList2[j].initiativeName;


                                }
                            }
                        }
                        $scope.initiative_list = data;
                        console.log(data);
                        $scope.loading = false;
                    });
                });
            }


        };
        $scope.goPage = function (pageN) {
            var page = $scope.pageNumber;
            $scope.loading = true;
            console.log(pageN);
            if (pageN === 3)
            {
                $scope.first = 2;
                $scope.middle = 3;
                $scope.last = 4;
                $scope.active[0] = " ";
                $scope.active[1] = "active"
                $scope.active[2] = "";
            }
            else if (pageN === 4)
            {
                $scope.active[0] = " ";
                $scope.active[1] = ""
                $scope.active[2] = "active";
            }
            else
            {
                $scope.active[page - 1] = " ";
                $scope.active[pageN - 1] = "active";
            }
            var size = $scope.pageSize;
            var order = $scope.order;

            $scope.pageNumber = pageN;
            console.log(pageN);

            var parentList2 = [];
            var parent = ajaxRequest.send('lookups/bi/parentlist');
            parent.then(function (data1) {
                parentList2 = data1;
                var ajax = ajaxRequest.send('grids/bi/' + pageN + '/id/' + order + '/' + size + '/');
                ajax.then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].status = false;
                        var arr = [];
                        for (var j = 0; j < parentList2.length; j++) {
                            if (data[i].parent_initiative_id == parentList2[j].initiativeId) {
                                data[i].parent_name = parentList2[j].initiativeName;
                                arr[i] = parentList2[j].initiativeName;


                            }
                        }
                    }
                    $scope.initiative_list = data;
                    $scope.loading = false;
                });
            });
        };
        $scope.update = function (value) {
            console.log($scope.pageSize);
            var size = $scope.pageSize;
            var order = $scope.order;
            var pageIn = ajaxRequest.send('bi/list');
            pageIn.then(function (data) {
                var len = data.length;
                var page = len / size;
                page = Math.round(page);
                var pag = [];
                for (var i = 0; i < page; i++) {
                    pag[i] = "";
                }
                $scope.page = pag;
                $scope.pageNumber = 1;

            });
            $scope.loading = true;
            var parentList2 = [];
            var parent = ajaxRequest.send('lookups/bi/parentlist');
            parent.then(function (data1) {
                console.log(data1);
                parentList2 = data1;
                $scope.parentList = data1;


                var ajax = ajaxRequest.send('grids/bi/1/id/' + order + '/' + size + '/');
                ajax.then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].status = false;
                        var arr = [];
                        for (var j = 0; j < parentList2.length; j++) {
                            if (data[i].parent_initiative_id == parentList2[j].initiativeId) {
                                data[i].parent_name = parentList2[j].initiativeName;
                                arr[i] = parentList2[j].initiativeName;
                                console.log(arr[i]);
                                console.log($scope.pageSize);
                            }
                        }
                    }

                    $scope.initiative_list = data;
                    //console.log(data);
                    $scope.loading = false;
                });
            });

        };

        $scope.sortPage = function (column) {
            if (column == 'name')
            {
                $scope.show1 = 'a';
            }
            else if (column == 'description')
            {
                $scope.show3 = 'a';
            }
            else
            {
                $scope.show2 = 'a';
            }
            if ($scope.icon === "glyphicon glyphicon-chevron-down")
            {
                $scope.icon = "glyphicon glyphicon-chevron-up";
            }
            else
            {
                $scope.icon = "glyphicon glyphicon-chevron-down";
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
            var parentList2 = [];
            var parent = ajaxRequest.send('lookups/bi/parentlist');
            parent.then(function (data1) {
                console.log(data1);
                parentList2 = data1;
                $scope.parentList = data1;


                var ajax = ajaxRequest.send('grids/bi/1/' + column + '/' + order + '/' + size + '/');
                ajax.then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].status = false;
                        var arr = [];
                        for (var j = 0; j < parentList2.length; j++) {
                            if (data[i].parent_initiative_id == parentList2[j].initiativeId) {
                                data[i].parent_name = parentList2[j].initiativeName;
                                arr[i] = parentList2[j].initiativeName;
                                console.log(arr[i]);
                                console.log($scope.pageSize);
                            }
                        }
                    }

                    $scope.initiative_list = data;
                    //console.log(data);
                    $scope.loading = false;
                });
            });
            console.log($scope.order);
        };
        $localStorage['ragObj'] = [
            {id: 'N', name: 'NEW', color: 'bnt-primary'},
            {id: 'D', name: 'DONE', color: 'btn-dark'},
            {id: 'R', name: 'RED', color: 'btn-danger'},
            {id: 'A', name: 'AMBER', color: 'btn-warning'},
            {id: 'G', name: 'GREEN', color: 'btn-success'}
        ];
         var actions = $localStorage['ragObj'];
        $scope.addInitiativeItem = function () {
            $scope.hideAllError();
            $scope.buttonShow = true;
            $scope.model_title = 'Add Business Initiative';
            $scope.item3 = {
                initiative_name: '',
                parent_initiative: '',
                description: '',
                status: '',
                parent_name: '',
                duedate: '',
                ragstatus: ''
            };
             $scope.selectedAction = actions[0];
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
            $scope.item3 = {
                id: item.id,
                initiative_name: item.name,
                parent_initiative: item.parent_name,
                description: item.description,
                index: index,
                status: item.status,
                parent_name: item.parent_name,
                duedate: item.duedate,
                ragstatus: item.ragstatus
            };
            _.each(actions, function (val, key) {
                if (val.id == $scope.item3.ragstatus)
                    $scope.selectedAction = val;
            });
            console.log($scope.selectedAction);
            $rootScope.$emit('modal-in-show');//calls directive modal in to show modal
        };
        $scope.$on('modal-close-in', function (ev, data) {
            console.log(data);
            if (data) {
                if (!data.type)
                {
                    $scope.initiative_list.splice($scope.item3.index, 1, data.data);
                }
                else {
                    $scope.initiative_list.unshift(data.data)
                }
            }
        });

        $scope.initiative_list = [];
//        $scope.saveInitiativeItem = function () {
//
//            if (!$scope.item.initiative_name && !$scope.item.parent_initiative) {
//                $scope.errorName = "has-error has-feedback";
//                $scope.nameClose = true;
//                $scope.errorUnitName = "has-error has-feedback";
//                $scope.selectClose = true;
//            } else if (!$scope.item.initiative_name) {
//                $scope.errorName = "has-error has-feedback";
//                $scope.nameClose = true;
//            } else if (!$scope.item.parent_initiative) {
//                $scope.errorUnitName = "has-error has-feedback";
//                $scope.selectClose = true;
//            } else {
//                $scope.saveLoading = true;
//                var parent_id = 0;
//                for (var i = 0; i < parentList2.length; i++) {
//                    if (parentList2[i].initiativeName == $scope.item.parent_initiative) {
//                        parent_id = parentList2[i].initiativeId
//                    }
//                }
//
//                console.log("parent_id :- " + parent_id);
//                console.log("parent_Name :- " + $scope.item.initiative_name);
//                console.log("parent_desc:- " + $scope.item.description);
//                console.log("parent_parent_initiative:- " + $scope.item.parent_initiative);
//                var myobj = {};
//                var url = 'bi/add';
//                var values = {
//                    "name": $scope.item.initiative_name,
//                    "parent_initiative_id": parseInt(parent_id),
//                    "description": $scope.item.description
//                };
//                var promise = ajaxRequest.send(url, values, 'POST');
//                promise.then(
//                        function (result) {
//                            if (result.status == "OK") {
//                                $scope.saveLoading = false;
//                                myobj.id = result.lastid;
//                                myobj.name = $scope.item.initiative_name;
//                                myobj.parent_initiative_id = parent_id;
//                                myobj.description = $scope.item.description;
//                                myobj.status = false;
//                                myobj.parent_name = $scope.item.parent_initiative;
//                                $scope.initiative_list.unshift(myobj);
//                                $('#initiative_Modal').modal('hide');
//                            } else {
//                                console.log(data.error);
//                                //alert(result.error);
//                                $scope.alertmsg = true;
//                                $scope.saveLoading = false;
//                                $scope.hideAlert();
//                                $('#initiative_Modal').modal('hide');
//                            }
//                        });
//                promise.catch(
//                        function (e) {
//                            console.log(e);
//                            $scope.alertmsg = true;
//                            $scope.saveLoading = false;
//                            $scope.hideAlert();
//                        });
//            }
//        };
        $scope.page = function () {
        };


        $scope.deleteInitiativeItem = function (items, indexs) {
            console.log(items);
            $scope.ifpopover = items.id;
            $scope.deleteLoader = items.id;
            var url = 'bi/delete';
            var dataId = {
                "id": items.id
            };
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
                var srchVal = {
                    "name": $scope.search
                };
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
//        $scope.hideAlert = function () {
//            $timeout(function () {
//                $scope.alertmsg = false;
//            }, 10000);
//        }
//        $scope.errorHideName = function () {
//            $scope.errorName = "";
//            $scope.nameClose = false;
//        }
//        $scope.errorHideSelect = function () {
//            $scope.errorUnitName = "";
//            $scope.selectClose = false;
//        }
//        $scope.findError = function () {
//            $scope.errorFind = "";
//            $scope.findClose = false;
//        }


    }
]);

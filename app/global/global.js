'use strict';
var globalMod = angular.module('MMI.global', ['MMI.ajaxService', 'ui.router', 'ngStorage']);
globalMod.controller('GlobalCtrl', ['$scope', 'ajaxRequest', '$state', '$localStorage', '$rootScope', 'exploreGraph',
    function ($scope, ajaxRequest, $state, $localStorage, $rootScope, exploreGraph) {
        $scope.checkUser = function () {
            $scope.is_login = false;
            if ($localStorage.user) {
                console.log('user logged in');
                $scope.is_login = true;
            } else {
                console.log('user not logged in');
            }
        };
        console.log("parent Ctrl");
        console.log($state.current.name);
        var currentState = $state.current.name;

        $scope.checkUser();
        $rootScope.$on('$stateChangeStart',
                function () {
                    $scope.checkUser();
                });
        $scope.goBobjective = function () {
            $state.go("main.objective");
        }

        var mobileView = 992;

        $scope.getWidth = function () {
            return window.innerWidth;
        };

//        $scope.$watch($scope.getWidth, function (newValue, oldValue) {
//            if (newValue >= mobileView) {
//                if (angular.isDefined($cookieStore.get('toggle'))) {
//                    $scope.toggle = !$cookieStore.get('toggle') ? false : true;
//                } else {
//                    $scope.toggle = true;
//                }
//            } else {
//                $scope.toggle = false;
//            }
//
//        });

        $scope.toggleSidebar = function () {
            $scope.toggle = !$scope.toggle;
            if ($scope.toggle) {
                $scope.menuHide = true;
            } else {
                $scope.menuHide = false;
            }
//            $cookieStore.put('toggle', $scope.toggle);
        };

        window.onresize = function () {
            $scope.$apply();
        };


        if (currentState == "main.graph") {
            $scope.summaryMenu = false;
            $scope.adminMenu = false;
            $scope.visualizationMenu = true;
            $scope.exploreMenu = false;
        }
        else if (currentState == "main.explore") {

            $scope.exploreMenu = true;
            $scope.summaryMenu = false;
            $scope.adminMenu = false;
            $scope.visualizationMenu = false;
        }
        else if (currentState == "main.objectiveGrid" || currentState == "main.summary") {
            $scope.summaryMenu = true;
            $scope.adminMenu = false;
            $scope.visualizationMenu = false;
            $scope.exploreMenu = false;
        } else if (currentState == "main.dashboard" || currentState == "main.objective" || currentState == "main.initiative" || currentState == "main.capabilities") {
            $scope.summaryMenu = false;
            $scope.adminMenu = true;
            $scope.visualizationMenu = false;
            $scope.exploreMenu = false;
        }

        else {
            $scope.exploreMenu = false;
            $scope.summaryMenu = false;
            $scope.adminMenu = false;
            $scope.visualizationMenu = false;
        }
        $rootScope.$on('checkMenu', function (event, menuItem) {
            $scope.checkMenu(menuItem.view);
        });
        $scope.checkMenu = function (menuItem) {
            console.log(menuItem);
            if (menuItem == "summaryMenu") {
                $scope.exploreMenu = false;
                $scope.summaryMenu = true;
                $scope.adminMenu = false;
                $scope.visualizationMenu = false;
            } else if (menuItem == "visualizationMenu") {
                $scope.exploreMenu = false;
                $scope.summaryMenu = false;
                $scope.adminMenu = false;
                $scope.visualizationMenu = true;
            }
            else if (menuItem == "menuExplore") {

                $scope.exploreMenu = true;
                $scope.summaryMenu = false;
                $scope.adminMenu = false;
                $scope.visualizationMenu = false;
            }
            else if (menuItem == "adminMenu") {
                $scope.exploreMenu = false;
                $scope.summaryMenu = false;
                $scope.adminMenu = true;
                $scope.visualizationMenu = false;
            } else {
                $scope.exploreMenu = false;
                $scope.summaryMenu = false;
                $scope.adminMenu = false;
                $scope.visualizationMenu = false;
            }
        };
        $rootScope.$on('save-changes-in', function (eve, data) {

            $scope.item3 = data;
            console.log(data);
            var parent_id = 0;

            parent_id = $scope.item3.parent_id;
            var url = 'bi/update';
            //Id needs to be included to the API call:
            var val = {"id": $scope.item3.id, "parent_initiative_id": parent_id, "description": $scope.item3.description, "name": $scope.item3.initiative_name, "parent_name": $scope.item3.parent_initiative, "status": false};
            var values = {"id": $scope.item3.id, "parent_initiative_id": parent_id, "name": $scope.item3.initiative_name, "description": $scope.item3.description};
            console.log("Going to send update. Values listed below:");
            var promise = ajaxRequest.send(url, values, 'POST');
            promise.then(
                    function (result) {
                        if (result.status == "OK") {
                            $scope.initiative_list.splice($scope.item3.index, 1, val);
                            $scope.saveLoading = false;
                            $rootScope.$broadcast('modal-close-in', val);
                        } else {

                            $rootScope.$broadcast('modal-close-in');
                        }
                    });
            promise.catch(
                    function (e) {
                        console.log(e);
                        //alert(e);
                        $rootScope.$broadcast('modal-close-in');
                        $scope.alertmsg = true;
                        $scope.saveLoading = false;
//                        $scope.hideAlert();
                    });

        });
        $rootScope.$on('save-changes-obj', function (eve, data) {

            $scope.item2 = data.data;
            var type = data.type;
            console.log(data);
            var bussUnit = 0;
            bussUnit = $scope.item2.unit_id;
            var url = '';
            if (!type)
            {
                url = 'bo/update';
            }
            else {
                var myobj = {};
                url = 'bo/add';
            }
            //Id needs to be included to the API call:
            var val = {"id": $scope.item2.id, "business_unit_id": bussUnit, "description": $scope.item2.description, "name": $scope.item2.objective_name, "unit_name": $scope.item2.business_unit, "status": false};
            var values = {"id": $scope.item2.id, "business_unit_id": bussUnit, "description": $scope.item2.description, "name": $scope.item2.objective_name};
            console.log("Going to send update. Values listed below:");
            var promise = ajaxRequest.send(url, values, 'POST');
            promise.then(
                    function (result) {
                        if (result.status == "OK") {
                            if (!type)
                            {
                                $rootScope.$broadcast('modal-close-obj', {data: val, type: type});
                            }
                            else {
                                myobj.id = result.lastid;
                                myobj.name = $scope.item2.objective_name;
                                myobj.business_unit_id = bussUnit;
                                myobj.description = $scope.item2.description;
                                myobj.status = false;
                                myobj.unit_name = $scope.item2.business_unit;
                                $rootScope.$broadcast('modal-close-obj', {data: myobj, type: type});
                            }
                        } else {
                            $rootScope.$broadcast('modal-close-obj');
                        }
                    });
            promise.catch(
                    function (e) {
//                        console.log(e);
//                        //alert(e);
//                        $scope.alertmsg = true;
//                        $scope.saveLoading = false;
//                        $scope.hideAlert();
                    });
        });
        $rootScope.$on('save-changes', function (eve, data) {
            console.log(data);
            $scope.item = data.data;
            var url = '';
            var type = data.type;//false for edit and true for add
            if (!type)
            {
                url = 'bu/update';
            }
            else
            {
                url = 'bu/add';
            }
            var myobj = {};
            //Id needs to be included to the API call:
            var values = {"id": $scope.item.id, "name": $scope.item.name, "short_code": $scope.item.short_code, "org_level": $scope.item.org_level};
            console.log("Going to send update. Values listed below:");
            var promise = ajaxRequest.send(url, values, 'POST');
            promise.then(
                    function (result) {
                        if (result.status == "OK") {
                            var val_unit = {"id": $scope.item.id, "name": $scope.item.name, "short_code": $scope.item.short_code, "org_level": $scope.item.org_level, "status": false};
                            if (type)
                            {
                                myobj.id = result.lastid;
                                myobj.name = $scope.item.name;
                                myobj.short_code = $scope.item.short_code;
                                myobj.org_level = $scope.item.org_level;
                                myobj.status = false;
                                $rootScope.$broadcast('modal-close', {data: myobj, type: type});
                            }
                            else
                                $rootScope.$broadcast('modal-close', {data: val_unit, type: type});
                        } else {
                            $rootScope.$broadcast('modal-close');
                        }
                    });
            promise.catch(
                    function (e) {

                    });
        });

    }]);

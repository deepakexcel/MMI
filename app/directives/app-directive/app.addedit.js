angular.module('MMI.dir', [])
        .directive('addEditModal', addEditBusinessUnit)
        .directive('addEditObj', addEditBusinessObjective)
        .directive('addEditIn', addEditbusinessInitiative);
function addEditbusinessInitiative($timeout, $rootScope,downDrillService) {
console.log("gdugsu");
    var modal = {
    };
    modal.restrict = 'E';
    modal.scope = {
        item: '=node',
        parentList2: '=unit',
        buttonShow: '=btn',
        selectedAction: '=sel'
    };
    modal.templateUrl = 'global/dir-template/addeditin.html';
    modal.controller = function ($scope, $rootScope, $localStorage) {
        $rootScope.$on('modal-close-in', function () {
            $scope.saveLoading = false;
            $('#initiative_Modal').modal('hide');
        });
	console.log($localStorage['ragObj']);
        $scope.actions = $localStorage['ragObj'];
        $scope.selectedAction = $scope.actions[0];

        $scope.setAction = function (action) {
	$scope.item.ragstatus=action.id;
            console.log(action);
            $scope.selectedAction = action;
//            $scope.submit();
        };
//        var op = 'N';
//        $scope.submit = function () {
//            console.log($scope.selectedAction.id);
//            op = $scope.selectedAction.id;
//        };

        $scope.open = function ($event) {
            console.log('ok')
            $scope.status.opened = true;
        };
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
        $scope.editInitiativeRecord = function (indexx) {
console.log('	baebalb');
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
            }
            else if (!$scope.item.duedate) {
                $scope.errorUnitName = "has-error has-feedback";
                $scope.selectClosed = true;
            }
            else {
                $scope.saveLoading = true;

                for (var i = 0; i < $scope.parentList2.length; i++) {
                    if ($scope.parentList2[i].initiativeName == $scope.item.parent_initiative) {
                        $scope.item.parent_id = $scope.parentList2[i].initiativeId;
                        $scope.item.ragstatus = $scope.selectedAction.id;
                    }
                }
                console.log($scope.item);
                $rootScope.$emit('save-changes-in', {data: $scope.item, type: $scope.buttonShow});
            }
        };
        $scope.errorHideDate = function () {
            $scope.errorName = "";
            $scope.selectClosed = false;
        };
        $scope.hideAlert = function () {
            $timeout(function () {
                $scope.alertmsg = false;
            }, 10000);
        };
        $scope.errorHideName = function () {
            $scope.errorName = "";
            $scope.nameClose = false;
        };
        $scope.errorHideSelect = function () {
            $scope.errorUnitName = "";
            $scope.selectClose = false;
        };
        $scope.findError = function () {
            $scope.errorFind = "";
            $scope.findClose = false;
        };
    };
    modal.link = function (scope, elem, attr) {

        $rootScope.$on('modal-in-show', function (ev, data) {
	console.log("innnnnn");
            if (data)
            {


                scope.buttonShow = data.type;
            }
            else
            {
                scope.buttonShow = false;
            }
            $timeout(function () {
                console.log(scope.parentList);
                console.log(scope.item);

                $('#initiative_Modal').modal({backdrop: true})
            }, 500);

        });

        console.log(scope);
    };
    return modal;

}
function addEditBusinessObjective($timeout, $rootScope) {
    var modal = {
    };
    modal.restrict = 'E';
    modal.scope = {
        item: '=node',
        unitList: '=unit',
        buttonShow: '=btn'
    };
    modal.templateUrl = 'global/dir-template/addeditobj.html';
    modal.controller = function ($scope, $rootScope) {
        $rootScope.$on('modal-close-obj', function () {
            $scope.saveLoading = false;
            $('#objective_Modal').modal('hide');
        });
        $scope.editObjectiveRecord = function (indexx) {

            if (!$scope.item.objective_name && !$scope.item.business_unit) {
                $scope.errorName = "has-error has-feedback";
                $scope.nameClose = true;
                $scope.errorUnitName = "has-error has-feedback";
                $scope.selectClose = true;
                $scope.saveLoading = false;
                //alert("pls must fill all the field");
            } else if (!$scope.item.objective_name) {
                $scope.errorName = "has-error has-feedback";
                $scope.nameClose = true;
            } else if (!$scope.item.business_unit) {
                $scope.errorUnitName = "has-error has-feedback";
                $scope.selectClose = true;
            } else {
                $scope.saveLoading = true;

                for (var i = 0; i < $scope.unitList.length; i++) {

                    if ($scope.unitList[i].displayName == $scope.item.business_unit) {
                        $scope.item.unit_id = $scope.unitList[i].id;
                    }
                }
                console.log($scope.item);
                $rootScope.$emit('save-changes-obj', {data: $scope.item, type: $scope.buttonShow});
            }
        };


        $scope.hideAlert = function () {
            $timeout(function () {
                $scope.alertmsg = false;
            }, 10000);
        };
        $scope.errorHideName = function () {
            $scope.errorName = "";
            $scope.nameClose = false;
        };
        $scope.errorHideSelect = function () {
            $scope.errorUnitName = "";
            $scope.selectClose = false;
        };
        $scope.findError = function () {
            $scope.errorFind = "";
            $scope.findClose = false;
        };
    };
    modal.link = function (scope, elem, attr) {

        $rootScope.$on('modal-obj-show', function (ev, data) {
            if (data)
                scope.buttonShow = data.type;
            else
                scope.buttonShow = false;
            $timeout(function () {
                console.log(scope.item);
                $('#objective_Modal').modal({backdrop: true});
            }, 500);

        });

        console.log(scope);
    };
    return modal;
}
;
function addEditBusinessUnit($timeout, $rootScope) {
    var modal = {
    };
    modal.restrict = 'E';
    modal.scope = {
        item: '=node',
        buttonShow: '=btn'
    };
    modal.templateUrl = 'global/dir-template/addeditmodal.html';
    modal.controller = function ($scope, $rootScope) {
        $scope.editRecord = function () {

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
                $rootScope.$emit('save-changes', {data: $scope.item, type: $scope.buttonShow});
            }
        };
        $rootScope.$on('modal-close', function () {
            $scope.saveLoading = false;
            $('#unit_Modal').modal('hide');
        });
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
    };
    modal.link = function (scope, elem, attr) {

        $rootScope.$on('modal-show', function () {

            $timeout(function () {
                $('#unit_Modal').modal({backdrop: true});
            }, 500);

        });

        console.log(scope);
    };
    return modal;
}

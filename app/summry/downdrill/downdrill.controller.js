(function() {
    'use strict';
    angular.module('MMI.downDrill')
        .controller('downDrillCtrl', downDrillCtrl);

    function downDrillCtrl($scope, $state, $stateParams, ajaxRequest, downDrillService, $rootScope) {
        $scope.loading = true;
        var graphName = $stateParams.graphname;
        console.log(graphName);
        var elem = document.getElementById('explorer');
        console.log(elem);
        //downDrillService.initialize();
        var explorer = downDrillService.newTree(elem);


        // for test purposes
        downDrillService.getDrawdata(explorer, graphName, $stateParams.param1, $stateParams.param2, $stateParams.param3);

        elem.addEventListener('action', function(evt) {
            var data = evt.data;
            console.log('[HTMLElement bind] Action "' + data.action + '" performed: ', 'Explorer=', data.treeContext, 'Node=', data.nodeContext);
        });

        elem.addEventListener('buttonclick', function(evt) {
            var data = evt.data;
            console.log('[HTMLElement bind] Button clicked "' + data.button.id + '"; ', 'Explorer=', data.treeContext, 'Node=', data.nodeContext);
            var data = evt.data;
            var node = data.nodeContext;
            var action = data.button.id;
            console.log(node);
            console.log(action);
            $scope.model_title = 'Edit Business Unit';
            if (action == "crud-edit-bi" || action == 'crud-add-bi') {
                $scope.item3 = {
                    id: node.id,
                    initiative_name: node.name,
                    parent_initiative: node.parent.name,
                    description: node.description,
                    status: node.ragstatus,
                    parent_name: node.parent.name,
                    duedate: node.duedate

                };
                $scope.$emit('modal-in-show');
            } else if (action == 'crud-edit-bo' || action == 'crud-edit-sbo' || action == 'crud-add-bo') {
                $scope.item2 = {
                    id: node.id,
                    objective_name: node.name,
                    business_unit: node.parent.name,
                    description: node.description,
                    unit_id: node.parent.id

                };
                console.log($scope.item2);
                $scope.$emit('modal-obj-show');
            } else if (action == 'crud-edit-bu') {
                $scope.$emit('modal-show');
            } else {
                $rootScope.event = action;
                console.log($scope.event);
                $state.go('error');
            }



        });
    };
})();
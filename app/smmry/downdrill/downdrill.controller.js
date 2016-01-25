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
            if (action == 'crud-edit-bi') {
                $rootScope.contentValue = node;
                $rootScope.$emit(action);
            } else {
                $rootScope.event = action;
                $state.go('error');
            }
        });
    };
})();
(function () {
    'use strict';
    angular.module('MMI.explore')
            .controller('ExploreCtrl', exploreCtrl);
    function exploreCtrl(exploreGraph, $scope, $stateParams, ajaxRequest, $rootScope)
    {
        window.document.title = "Explore";
        $scope.id = $stateParams.id;
        $rootScope.$emit('checkMenu', {view: 'menuExplore'});
        var self = this;
	
        self.graph = function () {
            var data = exploreGraph.data($scope.id);
            data.then(function (data) {
                console.log(data);
                $scope.graph = true;
                var explorer = exploreGraph.create(data);

                explorer.on('action', function (evt) {
                    var data = evt.data;
                    var node = data.nodeContext;
                    var action = data.action;
//                console.log(evt);
//                console.log(data)
                    console.log(node);
                    console.log(action);

                    console.log('In editItem function - lets log item we have:');
                    $scope.model_title = 'Edit Business Unit';


                    if (action == 'bu.edit')
                    {
                        $scope.item = {
                            id: node.id,
                            name: node.name,
                            short_code: node.short_code,
                            org_level: parseInt(node.org_level),
                            index: parseInt(node.id - 1)
                        };
                        $scope.$emit('modal-show');
                    }

                    else if (action == 'bo.edit' || action == 'sbo.edit' || action == 'bo.add')
                    {
                        var unit_name;
                        for (var j = 0; j < $scope.unitList.length; j++) {
                            if (node.business_unit_id == $scope.unitList[j].id) {
                                unit_name = $scope.unitList[j].displayName;
                            }
                        }
                        if (action != 'bo.add')
                        {
                            $scope.item2 = {
                                id: node.id,
                                objective_name: node.name,
                                business_unit: unit_name,
                                description: node.description,
                                unit_id: node.business_unit_id
                            };

                        }
                        else
                        {
                            $scope.item2 = {};
                            var type = {type: true};
                        }
                        $rootScope.$emit('modal-obj-show', type);
                    }
                    else if (action == "bi.edit" || action == 'bi.add')
                    {
                        console.log($rootScope.parentList);
			$scope.$emit('modal-in-show');
                        var parent_name;
                        for (var j = 0; j < $rootScope.parentList.length; j++) {
                            if (node.parent_initiative_id == $rootScope.parentList[j].initiativeId) {
                                parent_name = $rootScope.parentList[j].initiativeName;
                            }
                        }
                        if (action != 'bi.add')
                        {
 			var item = ajaxRequest.send('bi/find?id='+node.id+'');
				item.then(function(data){
				$scope.item3.ragstatus=data.ragstatus;
				$scope.item3.duedate=data.duedate;
			
				});
                            $scope.item3 = {
                                id: node.id,
                                initiative_name: node.name,
                                parent_initiative: parent_name,
                                description: node.description,
                                status: node.status,
                                parent_name: parent_name

                            };
			console.log($scope.item3);
			$scope.$emit('modal-in-show',true);
                        }
                        else
                        {
                            $scope.item3 = {};
                            var type = {type: true};
				console.log("null");
				$scope.$emit('modal-in-show',true);
				//$scope.$emit('modal-obj-show',true);
                        }
                        //$rootScope.$emit('modal-in-show', type);
                    }
//                console.log('[Explorer bind] Action "' + data.action + '" performed: ', 'Explorer=', data.treeContext, 'Node=', data.nodeContext);
                });
            });
        }

        var unit = ajaxRequest.send('lookups/bu/list');
        unit.then(function (data1) {
            $scope.unitList = data1;
        });
        var parent = ajaxRequest.send('lookups/bi/parentlist');
        parent.then(function (data1) {
            $rootScope.parentList = data1;
        });
        self.graph();
        $scope.$on('modal-close', function (ev, data) {
            if (data)
                self.graph();
            $scope.graph = false;
        });
        $scope.$on('modal-close-obj', function (ev, data) {
            if (data)
                self.graph();
            $scope.graph = false;
        });
        $scope.$on('modal-close-in', function (ev, data) {
            if (data)
                self.graph();
            $scope.graph = false;
        });

    }
    ;
})();


(function() {
    'use strict';
    angular.module('MMI.downDrill')
        .factory('downDrillService', downDrillService);

    function downDrillService(ajaxRequest) {
        var service = {};

        service.newTree = function(elem) {
            var tree = new MMIIndentedTree(elem, {
                barHeight: 40,
                actionCallback: function(action, tree, node) {
                    console.log('[Callback] Action "' + action + '" performed: ', 'Explorer=', tree, 'Node=', node);
                },


            });
            return tree;
        }


        service.getDrawdata = function(explorer, graph, param1, param2, param3) {
            if (graph == undefined || graph == "") {
                var item = ajaxRequest.apiGet('drilldown/crud');
            } else {
                var item = ajaxRequest.apiGet('drilldown/' + graph + '?param1=' + param1 + '&param2=' + param2 + '&param3=' + param3);
            }
            item.then(function(data) {
                service.drawDownDrill(explorer, data);
            });
        }

        service.drawDownDrill = function(explorer, data) {
            explorer.draw(data);
        }

        return service;
    }

})();
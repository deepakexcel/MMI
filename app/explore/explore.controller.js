(function () {
    'use strict';
    angular.module('MMI.explore')
            .controller('ExploreCtrl', exploreCtrl);
    function exploreCtrl(Explorer, data)
    {
        console.log('exploreCtrl');
        var elem = document.getElementById('explorer');

        var explorer = new Explorer(elem, {
            shapeAttributes: {
                circle: {fill: "red"},
                lightbulb: {fill: 'green'},
            },
            actionCallback: function (action, tree, node) {
                console.log('[Callback] Action "' + action + '" performed: ', 'Explorer=', tree, 'Node=', node);
            }
        });

        explorer.draw(data);

        elem.addEventListener('action', function (evt) {
            var data = evt.data;
            console.log('[HTMLElement bind] Action "' + data.action + '" performed: ', 'Explorer=', data.treeContext, 'Node=', data.nodeContext);
        });

        explorer.on('action', function (evt) {
            var data = evt.data;
            console.log('[Explorer bind] Action "' + data.action + '" performed: ', 'Explorer=', data.treeContext, 'Node=', data.nodeContext);
        });
    }
    ;
})();


(function () {
    'use strict';
    angular.module('MMI.explore')
            .factory('Explorer', exploreCtrl)
            .factory('data', data);
    function data() {
        return {
            "id": "1",
            "short_code": "BU A",
            "name": "Business Unit A",
            "org_level": "1",
            "display_meta_JSON": null,
            "viewinfo": {
                "color": "#26334b",
                "label": "BU A",
                "hint": "Business Unit A",
                "shape": "square",
                "actions": [
                    {id: "edit", name: "Edit"},
                    {id: "add_objective", name: "Add Objective"}
                ]
            },
            "objectives": [
                {
                    "id": "1",
                    "business_unit_id": "1",
                    "name": "BO 1",
                    "description": "Demo Objective BO 1 with id 1",
                    "parent_objective_id": "0",
                    "viewinfo": {
                        "color": "#26334b",
                        "label": "Objective",
                        "hint": "BO 1",
                        "shape": "circle",
                        "actions": [
                            {"id": "edit", "name": "Edit"},
                            {"id": "add_sub_objective", "name": "Add Objective"},
                            {"id": "add_initiative", "name": "Add Initiative"}
                        ]
                    },
                    "objectives": [
                        {
                            "id": "2",
                            "business_unit_id": "1",
                            "name": "BO 1.1",
                            "description": "Demo Sub Objective BO 1.1 with id 2",
                            "parent_objective_id": "1",
                            "viewinfo": {
                                "color": "#26334b",
                                "label": "objective",
                                "hint": "BO 1.1",
                                "shape": "small-circle",
                                "actions": [
                                    {"id": "edit", "name": "Edit"},
                                    {"id": "add_initiative", "name": "Add Initiative"}
                                ]
                            },
                            "initiatives": [
                                {
                                    "id": "4",
                                    "parent_initiative_id": "0",
                                    "name": "I4",
                                    "description": "Demo Inititaive I4 with id 4",
                                    "ragstatus": "N",
                                    "duedate": "2016-01-01",
                                    "viewinfo": {
                                        "color": "#26334b",
                                        "label": "initiative",
                                        "hint": "I4",
                                        "shape": "lightbulb",
                                        "actions": [
                                            {"id": "edit", "name": "Edit"},
                                            {"id": "add_sub_initiative", "name": "Add Sub Initiative"},
                                            {"id": "add_dependancy_new", "name": "Add Dependancy (NEW)"},
                                            {"id": "add_dependancy_extend", "name": "Add Dependancy (EXTEND)"},
                                            {"id": "add_dependancy_use", "name": "Add Dependancy (USE)"}
                                        ]
                                    }
                                },
                                {
                                    "id": "5",
                                    "parent_initiative_id": "0",
                                    "name": "I5",
                                    "description": "Demo Inititaive I5 with id 5",
                                    "ragstatus": "N",
                                    "duedate": "2016-01-01",
                                    "viewinfo": {
                                        "color": "#26334b",
                                        "label": "initiative",
                                        "hint": "I5",
                                        "shape": "lightbulb",
                                        "actions": [
                                            {"id": "edit", "name": "Edit"},
                                            {"id": "add_sub_initiative", "name": "Add Sub Initiative"},
                                            {"id": "add_dependancy_new", "name": "Add Dependancy (NEW)"},
                                            {"id": "add_dependancy_extend", "name": "Add Dependancy (EXTEND)"},
                                            {"id": "add_dependancy_use", "name": "Add Dependancy (USE)"}
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "id": "3",
                            "business_unit_id": "1",
                            "name": "BO 1.2",
                            "description": "Demo Sub Objective BO 1.2 with id 3",
                            "parent_objective_id": "1",
                            "viewinfo": {
                                "color": "#26334b",
                                "label": "objective",
                                "hint": "BO 1.2",
                                "shape": "small-circle",
                                "actions": [
                                    {"id": "edit", "name": "Edit"},
                                    {"id": "add_initiative", "name": "Add Initiative"}
                                ]
                            },
                            "initiatives": [
                                {
                                    "id": "6",
                                    "parent_initiative_id": "0",
                                    "name": "I6",
                                    "description": "Demo Inititaive I6 with id 6",
                                    "ragstatus": "N",
                                    "duedate": "2016-01-01",
                                    "viewinfo": {
                                        "color": "#26334b",
                                        "label": "initiative",
                                        "hint": "I6",
                                        "shape": "lightbulb",
                                        "actions": [
                                            {"id": "edit", "name": "Edit"},
                                            {"id": "add_sub_initiative", "name": "Add Sub Initiative"},
                                            {"id": "add_dependancy_new", "name": "Add Dependancy (NEW)"},
                                            {"id": "add_dependancy_extend", "name": "Add Dependancy (EXTEND)"},
                                            {"id": "add_dependancy_use", "name": "Add Dependancy (USE)"}
                                        ]
                                    },
                                    "initiatives": [
                                        {
                                            "id": "7",
                                            "parent_initiative_id": "6",
                                            "name": "I6.1",
                                            "description": "Demo Sub Inititaive I6.1 with id 7",
                                            "ragstatus": "N",
                                            "duedate": "2016-01-01"
                                        },
                                        {
                                            "id": "8",
                                            "parent_initiative_id": "6",
                                            "name": "I6.2",
                                            "description": "Demo Sub Inititaive I6.2 with id 8",
                                            "ragstatus": "N",
                                            "duedate": "2016-01-01"
                                        },
                                        {
                                            "id": "9",
                                            "parent_initiative_id": "6",
                                            "name": "I6.3",
                                            "description": "Demo Sub Inititaive I6.3 with id 9",
                                            "ragstatus": "N",
                                            "duedate": "2016-01-01"
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "initiatives": [
                        {
                            "id": "1",
                            "parent_initiative_id": "0",
                            "name": "I1",
                            "description": "Demo Inititaive I1 with id 1",
                            "ragstatus": "N",
                            "duedate": "2016-01-01",
                            "viewinfo": {
                                "color": "#26334b",
                                "label": "initiative",
                                "hint": "I1",
                                "shape": "lightbulb",
                                "actions": [
                                    {"id": "edit", "name": "Edit"},
                                    {"id": "add_sub_initiative", "name": "Add Sub Initiative"},
                                    {"id": "add_dependancy_new", "name": "Add Dependancy (NEW)"},
                                    {"id": "add_dependancy_extend", "name": "Add Dependancy (EXTEND)"},
                                    {"id": "add_dependancy_use", "name": "Add Dependancy (USE)"}
                                ]
                            }
                        }
                    ]
                },
                {
                    "id": "4",
                    "business_unit_id": "1",
                    "name": "BO 2",
                    "description": "Demo Objective BO 2 with id 4",
                    "parent_objective_id": "0",
                    "viewinfo": {
                        "color": "#26334b",
                        "label": "Objective",
                        "hint": "BO 2",
                        "shape": "circle",
                        "actions": [
                            {"id": "edit", "name": "Edit"},
                            {"id": "add_sub_objective", "name": "Add Objective"},
                            {"id": "add_initiative", "name": "Add Initiative"}
                        ]
                    },
                    "initiatives": [
                        {
                            "id": "2",
                            "parent_initiative_id": "0",
                            "name": "I2",
                            "description": "Demo Inititaive I2 with id 2",
                            "ragstatus": "N",
                            "duedate": "2016-01-01",
                            "viewinfo": {
                                "color": "#26334b",
                                "label": "initiative",
                                "hint": "I2",
                                "shape": "lightbulb",
                                "actions": [
                                    {"id": "edit", "name": "Edit"},
                                    {"id": "add_sub_initiative", "name": "Add Sub Initiative"},
                                    {"id": "add_dependancy_new", "name": "Add Dependancy (NEW)"},
                                    {"id": "add_dependancy_extend", "name": "Add Dependancy (EXTEND)"},
                                    {"id": "add_dependancy_use", "name": "Add Dependancy (USE)"}
                                ]
                            }
                        },
                        {
                            "id": "3",
                            "parent_initiative_id": "0",
                            "name": "I3",
                            "description": "Demo Inititaive I3 with id 3",
                            "ragstatus": "N",
                            "duedate": "2016-01-01",
                            "viewinfo": {
                                "color": "#26334b",
                                "label": "initiative",
                                "hint": "I3",
                                "shape": "lightbulb",
                                "actions": [
                                    {"id": "edit", "name": "Edit"},
                                    {"id": "add_sub_initiative", "name": "Add Sub Initiative"},
                                    {"id": "add_dependancy_new", "name": "Add Dependancy (NEW)"},
                                    {"id": "add_dependancy_extend", "name": "Add Dependancy (EXTEND)"},
                                    {"id": "add_dependancy_use", "name": "Add Dependancy (USE)"}
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    }
    ;
    function exploreCtrl()
    {


        var LIGHTBULB_PATH = "M5.467,12.003c-0.222,0-0.333,0.295-0.185,0.442C5.615,12.742,5.874,13,6.095,13h0.812" +
                "c0.221,0,0.442-0.223,0.774-0.555c0.186-0.146,0.073-0.442-0.185-0.442H5.467z M7.979,11.375H5.061" +
                "c-0.295,0-0.517-0.223-0.517-0.518s0.222-0.518,0.517-0.518h2.917c0.295,0,0.518,0.223,0.518,0.518S8.273,11.375,7.979,11.375z" +
                "M5.024,9.713c-0.259,0-0.48-0.186-0.517-0.443c0-0.037-0.111-0.59-0.702-1.438C3.731,7.719,3.621,7.57,3.547,7.46" +
                "C2.919,6.574,2.291,5.65,2.291,4.062c0-0.96,0.406-1.958,1.071-2.733C4.138,0.48,5.246,0,6.501,0c0.295,0,0.517,0.222,0.517,0.517" +
                "S6.797,1.034,6.501,1.034c-1.182,0-1.92,0.554-2.327,0.997C3.658,2.585,3.362,3.361,3.362,4.1c0,1.292,0.517,1.994,1.071,2.807" +
                "c0.074,0.11,0.185,0.258,0.259,0.368c0.739,1.072,0.849,1.772,0.849,1.847c0.037,0.295-0.147,0.517-0.443,0.591" +
                "C5.061,9.713,5.061,9.713,5.024,9.713z M7.979,9.713c-0.037,0-0.037,0-0.074,0C7.609,9.676,7.425,9.418,7.462,9.122" +
                "c0-0.074,0.146-0.774,0.849-1.847c0.074-0.111,0.186-0.258,0.26-0.369c0.592-0.812,1.07-1.551,1.07-2.806" +
                "c0-0.702-0.332-1.478-0.851-2.068C8.201,1.403,7.389,1.034,6.501,1.034c-0.295,0-0.517-0.222-0.517-0.517S6.206,0,6.501,0" +
                "c2.511,0,4.209,2.105,4.209,4.062c0,1.588-0.627,2.511-1.256,3.398C9.382,7.57,9.271,7.719,9.197,7.83" +
                "C8.605,8.716,8.496,9.27,8.496,9.27C8.458,9.527,8.236,9.713,7.979,9.713z";

        /**
         * Emits html event with specified type from provided target
         *
         * @param target {EventTarget} - Target object that dispatches HTML event
         * @param type {string} - Type of the dipatched event
         * @param details {object} - Event details
         */
        function emit(target, type, details) {
            if (target.dispatchEvent && document.createEvent) {
                var evt = document.createEvent('HTMLEvents');

                details = details || {};

                evt.initEvent(type, !!details.bubbles, !!details.cancelable);

                delete details.bubbles;
                delete details.cancelable;

                for (var p in details) {
                    if (details.hasOwnProperty(p)) {
                        evt[p] = details[p];
                    }
                }

                target.dispatchEvent(evt);
            }
        }

        /**
         * Mixes all properties from obj1 to obj0. Basic implementation.
         */
        function mixin(/*...obj*/) {
            var target = arguments[0],
                    length = arguments.length;

            for (var i = 1; i < length; i++) {
                var source = arguments[i];
                if (typeof source != 'object') {
                    continue;
                }

                for (var p in source) {
                    if (source.hasOwnProperty(p)) {
                        target[p] = source[p];
                    }
                }
            }

            return target;
        }

        /**
         * @callback ActionCallback
         * @param {string} action - Actions that was called
         * @param {Explorer} treeContext - Tree context
         * @param {object} nodeContext - Data object from initial dataset related to the clicked node
         */

        /**
         * Configuration options hash map passed to the explorer on initialization
         * @typedef {Object} ExplorerConfig
         * @property {number} [width] - Width of the explorer
         * @property {number} [height] - Height of the explorer
         * @property {object} [shapeAttributes] Map of the attributes that will be applied to shapes
         * @property {object} [shapeAttributes.circle] Attributes for circle
         * @property {object} [shapeAttributes.small-circle] Attributes for small circle
         * @property {object} [shapeAttributes.square] Attributes for square
         * @property {object} [shapeAttributes.lightbulb] Attributes for lightbulb
         * @property {Function} [nodeText] Function that returns text for each node
         * @property {Function} [tooltipText] Function that returns text for tooltip
         * @property {number} [duration] Transition duration when expanding / collapsing
         * @property {ActionCallback} [actionCallback] Callback function that is called when action from context menu is clicked
         * @property {array} [margin] Explorer margin as array [top, right, bottom, left]
         *
         *
         */

        /**
         * Action event. This event is fired when user clicks on the context menu item from any node
         * @event ActionEvent
         * @type {Object}
         * @property {object} data - Custom data provided with this event
         * @property {Explorer} data.treeContext - Explorer component context
         * @property {object} data.nodeContext - Data related to the node event fired
         * @property {string} data.action - Action performed
         */

        /**
         * Visual explorer for strategic planning business model. Uses d3 for visualization purposes and jQuery for working
         * with document
         * @param {HTMLElement} el
         * @param {ExplorerConfig} config
         * @fires {ActionEvent}
         * @class
         * @alias module:Explorer
         * @constructor
         */
        var Explorer = function (el, config) {
            /**
             * HTML element explorer is created in
             * @type {HTMLElement}
             */
            this.el = el;

            /**
             * Flags that context menu is currently opened
             * @type {boolean}
             * @private
             */
            this._contextMenuActive = false;

            /**
             * Contains data, related to the node where context menu was opened
             * @type {null}
             * @private
             */
            this._contextMenuData = null;

            /**
             * Configuration object of the explorer
             * @type {ExplorerConfig}
             */
            this.config = {
                width: 0,
                height: 0,
                margin: [0, 100, 0, 150],
                nodeText: nodeText,
                tooltipText: tooltipText,
                duration: 300,
                actionCallback: null
            };

            // overrides default properties with provided (if any)
            if (config) {
                for (var p in config) {
                    if (config.hasOwnProperty(p)) {
                        this.config[p] = config[p]
                    }
                }
            }

            if (!this.config.width) {
                this.config.width = el.offsetWidth;
            }

            if (!this.config.height) {
                this.config.height = el.offsetHeight;
            }

            this._initContextMenu();
        };

        /**
         * Draws explorer visualization using providing optional data. If data is not provided, use previous cached data
         * If there is no previous data - throws Exception
         * @param {object} data - Data to visualize
         */
        Explorer.prototype.draw = function (data) {
            var width = this.config.width,
                    height = this.config.height;

            var m = this.config.margin;

            this.tree = d3.layout.tree().size([height - m[0] - m[2], width - m[1] - m[3]]);
            this.vis = d3.select(this.el).append('svg')
                    .attr('class', 'explorer-vis')
                    .attr('width', width)
                    .attr('height', height)

                    .append('g')
                    .attr('transform', 'translate(' + m[3] + ',' + m[0] + ')');

            this.diagonal = d3.svg.diagonal().projection(function (d) {
                return [d.y, d.x];
            });

            data.x0 = height / 2;
            data.y0 = 0;

            this.dataset = transform(data);

            this._update(this.dataset);
        };

        /**
         * Updates tree view based on the provided root
         * Called in the context of Explorer object
         * @private
         */
        Explorer.prototype._update = function (root) {
            var _this = this,
                    config = this.config;

            // transition stash
            var nodes = this.tree.nodes(this.dataset).reverse();

            // Normalize for fixed-depth.
            nodes.forEach(function (d) {
                d.y = d.depth * 200;
            });

            var nid = 0;
            var nodeGroup = this.vis.selectAll('g.node').data(nodes, function (d) {
                return d.nid || (d.nid = ++nid)
            });

            var nodeEnter = nodeGroup.enter().append('g')
                    .attr('class', 'node')
                    .attr('transform', function () {
                        return 'translate(' + root.y0 + ',' + root.x0 + ')'
                    })
                    .on('click', function (d) {
                        toggle(d);
                        _this._update(d);
                    })
                    .on('contextmenu', function (d) {
                        if (viewinfo(d).actions) {
                            _this._openContextMenu(d);
                        }
                    })
                    .on('mouseover', function (d) {
                        tooltip(_this.config.tooltipText(d), [d3.event.pageX + 3, d3.event.pageY + 3]);
                    })
                    .on('mousemove', function (d) {
                        tooltip(_this.config.tooltipText(d), [d3.event.pageX + 3, d3.event.pageY + 3]);
                    })
                    .on('mouseleave', function () {
                        tooltip.hide();
                    });

            nodeShape(nodeEnter, this.config);

            nodeEnter.append("text")
                    .attr("x", function (d) {
                        return d.children || d._children ? -5 : 18;
                    })
                    .attr("dy", "5")
                    .attr("text-anchor", function (d) {
                        return d.children || d._children ? "end" : "start";
                    })
                    .text(config.nodeText)
                    .style("fill-opacity", 0);

            // adds fake rectangle to the "g" so that mouseover always show tooltip.
            // otherwise it will not be shown when cursor is between icon and text, because g is just grouping element
            nodeEnter.append('rect')
                    .attr('width', function (d) {
                        return d.children || d._children ? 28 : 18
                    })
                    .attr('height', 18)
                    .attr('y', -6)
                    .attr('x', function (d) {
                        return d.children || d._children ? -18 : 0
                    })
                    .attr('fill', 'none');


            var nodeUpdate = nodeGroup.transition()
                    .duration(config.duration)
                    .attr('transform', function (d) {
                        return 'translate(' + d.y + ',' + d.x + ')'
                    });


            nodeUpdate.select('text')
                    .style('fill-opacity', 1);

            var nodeExit = nodeGroup.exit().transition()
                    .duration(config.duration).attr('transform', function () {
                return 'translate(' + root.y + ',' + root.x + ')'
            })
                    .remove();

            nodeExit.select('text')
                    .style('fill-opacity', 0);

            var link = this.vis.selectAll("path.link")
                    .data(this.tree.links(nodes), function (d) {
                        return d.target.nid;
                    });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                    .attr("class", "link")
                    .attr("d", function (d) {
                        var o = {x: root.x0, y: root.y0};
                        return _this.diagonal({source: o, target: o});
                    })
                    .transition()
                    .duration(config.duration)
                    .attr("d", this.diagonal);

            link.transition()
                    .duration(config.duration)
                    .attr("d", this.diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                    .duration(config.duration)
                    .attr("d", function (d) {
                        var o = {x: root.x, y: root.y};
                        return _this.diagonal({source: o, target: o});
                    })
                    .remove();

            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        };

        /**
         * Allows to connect to the events of explorer. Just delegates its to root element events
         * @param {string} eventType - Type of the event to connect to
         * @param {Function} callback - Callback function
         */
        Explorer.prototype.on = function (eventType, callback) {
            this.el.addEventListener(eventType, callback);
        };

        /**
         * Initializes context menu drop down
         * @private
         */
        Explorer.prototype._initContextMenu = function () {
            var _this = this;
            this.dropdown = document.body.appendChild(document.createElement('div'));
            this.dropdown.className = 'explorer-dropdown';

            window.addEventListener('keyup', function (evt) {
                if (evt.keyCode == 27 && _this._contextMenuActive) {
                    _this._closeContextMenu();
                }
            });

            window.addEventListener('click', function () {
                if (_this._contextMenuActive) {
                    _this._closeContextMenu();
                }
            });

            this.dropdown.addEventListener('click', function (evt) {
                evt.stopPropagation();
                var action = evt.target.getAttribute('data-action');

                emit(_this.el, 'action', {
                    bubbles: true,
                    cancelable: true,
                    data: {treeContext: _this, nodeContext: _this._contextMenuData, action: action}
                });

                if (_this.config.actionCallback) {
                    _this.config.actionCallback(action, _this, _this._contextMenuData);
                }

                _this._closeContextMenu();
            });
        };

        /**
         * Opens context menu with provided actions
         * @private
         */
        Explorer.prototype._openContextMenu = function (d) {
            var html = '';

            var dd = this.dropdown,
                    style = dd.style;

            var actions = viewinfo(d).actions;

            for (var i = 0, l = actions.length; i < l; i++) {
                var action = actions[i];
                html += '<div data-action="' + action.id + '">' + action.name + '</div>'
            }

            dd.innerHTML = html;

            d3.event.preventDefault();
            d3.event.stopPropagation();

            style.display = 'block';
            style.left = d3.event.pageX + 'px';
            style.top = d3.event.pageY + 'px';

            this._contextMenuActive = true;
            this._contextMenuData = d;
        };

        /**
         * Closes context menu
         * @private
         */
        Explorer.prototype._closeContextMenu = function () {
            this.dropdown.style.display = 'none';

            this._contextMenuActive = false;
            this._contextMenuData = null;
        };

        /**
         * Extracts viewinfo or emty object from d.
         * @param d
         * @return {viewinfo|{color, label, hint, shape, actions}|{}}
         */
        function viewinfo(d) {
            return d.viewinfo || {};
        }

        /**
         * Returns hint text that should be shown on node
         * @param {object} d - D3 data
         * @return {string}
         */
        function nodeText(d) {
            return viewinfo(d).label || '';
        }

        /**
         * Returns hint text that should be shown on tooltip
         * @param {object} d - D3 data
         * @return {string}
         */
        function tooltipText(d) {
            return viewinfo(d).hint || '';
        }

        /**
         * Returns color based on d.viewinfo definitino
         * @param d - D3 data object
         * @return {string}
         */
        function nodeColor(d) {
            return viewinfo(d).color || '#333';
        }

        /**
         * Applies node shape to the given selection and returns this selection for chain
         * @param {object} sel d3 selection
         * @param {ExplorerConfig} config
         */
        function nodeShape(sel, config) {
            var hash = {
                'circle': 'circle',
                'square': 'rect',
                'small-circle': 'circle',
                'lightbulb': 'path'
            };

            var customs = config.shapeAttributes || {};

            var attributes = {
                'circle': mixin({r: 6, cx: 6}, customs['circle']),
                'small-circle': mixin({r: 3, cx: 3}, customs['small-circle']),
                'square': mixin({y: -6, width: 12, height: 12}, customs['square']),
                'lightbulb': mixin({transform: 'translate(0, -6)', d: LIGHTBULB_PATH}, customs['lightbulb'])
            };

            var tagName = function (d) {
                return hash[shapeKey(d)] || 'circle';
            };

            var shapeKey = function (d) {
                return viewinfo(d).shape || 'circle';
            };


            var nodes = sel.append(function (d) {
                return document.createElementNS("http://www.w3.org/2000/svg", tagName(d));
            });

            nodes.each(function (d) {
                var attrs = mixin({fill: nodeColor(d)}, attributes[shapeKey(d)]);
                for (var p in attrs) {
                    if (attrs.hasOwnProperty(p)) {
                        this.setAttribute(p, attrs[p]);
                    }
                }
            });

            return nodes;
        }

        /**
         * Toggles expanded / collapsed state of the given node
         */
        function toggle(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;

            } else {
                d.children = d._children;
            }
        }

        /**
         * Default transformation function that creates required data format from given JSON
         *
         * @param data
         */
        function transform(data) {
            var children = [];
            if (data.objectives) {
                children.push.apply(children, data.objectives);
            }

            if (data.initiatives) {
                children.push.apply(children, data.initiatives);
            }

            if (children.length) {
                data.children = children;
                data.objectives = null;
                data.initiatives = null;

                for (var i = 0, l = data.children.length; i < l; i++) {
                    transform(data.children[i]);
                }
            }

            return data;
        }

        /**
         * Shows tooltip popup
         * @param text
         * @param coords
         */
        function tooltip(text, coords) {
            if (!text) {
                return;
            }

            var TOOLTIP_ID = tooltip.TOOLTIP_ID = '__mmi_explorer_tooltip';

            var node = document.getElementById(TOOLTIP_ID);

            if (!node) {
                node = document.body.appendChild(document.createElement('div'));
                node.id = TOOLTIP_ID;
                node.className = 'mmi-tooltip';
            }

            node.innerHTML = text;

            var st = node.style;

            st.left = coords[0] + 'px';
            st.top = coords[1] + 'px';
            st.display = 'block';
        }

        /**
         * Hides tooltip
         */
        tooltip.hide = function () {
            var node = document.getElementById(tooltip.TOOLTIP_ID);
            if (node) {
                node.style.display = 'none';
            }
        };

        return Explorer;

    }
    ;
})();


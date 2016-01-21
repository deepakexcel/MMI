var graphMod = angular.module('MMI.graph', ['MMI.ajaxService', 'ngStorage']);
graphMod.factory('chord',function(){

    /**
     * @typedef ChordDataset
     * @type    {Object}
     *
     * @property {Array.<module:charts/Chord~ChordRelationItem>} relations       Defines relations between entities
     * @property {Object.<string, any>} [entities]    Optional information about every entity. Could be used in callbacks
     *                                                while drawing
     */

    /**
     * @typedef ChordRelationItem
     * @type   Object
     *
     * @property {string} source - Source entity in the relation
     * @property {string} target - Target entity in the relation
     * @property {number} weight - Weight of the relation from source to target
     *
     */

    /**
     * @typedef EntityDetail
     *
     * @property {string} ename - Name of the entity
     * @property {Object} edata - Extra data of the entity taken from initial dataset entities definition
     */

    /**
     * This callback is called for each group on chart
     *
     * @callback    groupCallback
     * @param   {Object}    d - standard d3 data. For groups it looks like {index, startAngle, endAngle, value}
     * @param   {module:charts/Chord~EntityDetail}    detail - details of this entity
     */

    /**
     * This callback is called for each chord on chart
     *
     * @callback    chordCallback
     * @param   {Object}    d - standard d3 data. For chords it looks like {source : {index, startAngle, endAngle, value}, target : {index, startAngle, endAngle, value}}
     * @param   {module:charts/Chord~EntityDetail}    sourceDetail - Details of the source entity
     * @param   {module:charts/Chord~EntityDetail}    targetDetail - Details of the target entity
     */

    /**
     * @typedef Options
     *
     * @property {number} innerRadius - Inner radius of the ring
     * @property {number} outerRadius - Outer radius of the ring
     * @property {number} padding - Padding from the edge of the svg to the ring
     * @property {number} labelOffset - Offset of the label from outer ring
     * @property {number} groupOffset - Offset between groups on the ring measured in radians
     *
     * @property {string|module:charts/Chord~groupCallback} groupFillColor - Fill color for the group on the ring.
     * @property {string|module:charts/Chord~chordCallback} chordFillColor - Fill color for each chord
     * @property {string|module:charts/Chord~groupCallback} groupStrokeColor - Stroke color for the group on the ring.
     * @property {string|module:charts/Chord~chordCallback} chordStrokeColor - Stroke color for each chord.

     * @property {module:charts/Chord~groupCallback} labelText - Text for each group
     * @property {module:charts/Chord~chordCallback} chordClick - Callback function that is called when user clicks on chord
     *
     */

    var colorRange = d3.scale.category10();

    /**
     * Detects if provided value is instance of function
     */
    function isFunction(value){
        // typeof is quite enough here, though it has some issues.
        return typeof value == 'function';
    }

    /**
     * Creates function that will be passed to d3 from provided callback and entities details array
     * Callback is supposed to be called as (d, entity), passing standard d3 'd' and extra entity parameter
     *
     * @param {function} callback - Function with (d, entity) arguments
     * @param details - Information about entities
     */
    function wrapGroup(callback, details) {
        return !isFunction(callback) ? callback : function (d) {
            return callback.call(this, d, details[d.index]);
        }
    }

    /**
     * Creates function that will be passed to d3. Provided callback is supposed to take standard d3 'd' argument
     * and details for d.source and d.target
     *
     * @param callback
     * @param entities
     */
    function wrapChord(callback, details) {
        return !isFunction(callback) ? callback : function (d) {
            return callback.call(this, d, details[d.source.index], details[d.target.index]);
        }
    }

    /**
     * Wraps provided callback to be called with extra arguments
     * @param callback
     */
    function wrapWith(/*callback, ..opts?*/) {
        var args = Array.prototype.slice.call(arguments, 0),
            callback = args.shift();

        return function (d) {
            return callback.apply(this, [d].concat(args));
        }
    }

    /**
     * Returns text value for group. Dedfault implementation takes entity name
     *
     * @param d
     * @param detail
     * @returns {string}
     */
    function labelText(d, detail) {
        return detail.ename;
    }

    /**
     * Calculates position of the labels for groups
     *
     * @param d
     * @returns {string}
     */
    function calculateLabelPosition(d, opts) {
        return 'rotate(' + (d.angle * 180 / Math.PI - 90) + ')' + 'translate(' + (opts.outerRadius + opts.labelOffset) + ')' +
            (d.angle > Math.PI ? 'rotate(180)' : "");
    }

    /**
     * Default group fill color callback
     */
    function groupFillColor(d, detail) {
        return colorRange(d.index);
    }

    /**
     * Default group stroke color callback
     */
    function groupStrokeColor(d, detail) {
        return d3.rgb(colorRange(d.index)).darker();
    }

    /**
     * Returns chord fill color
     *
     * @param d
     * @param sourceDetail - Details of the source entity, taken from initial dataset definition
     * @param targetDetail - Details of the target entity, taken from initial dataset definition
     */
    function chordFillColor(d, sourceDetail, targetDetail) {
        return colorRange(d.source.index);
    }

    /**
     * Returns chord stroke color
     *
     * @param d
     * @param sourceDetail - Details of the source entity, taken from initial dataset definition
     * @param targetDetail - Details of the target entity, taken from initial dataset definition
     */
    function chordStrokeColor(d, sourceDetail, targetDetail) {
        return d3.rgb(colorRange(d.source.index)).darker();
    }

    /**
     * Handles click on the chord
     *
     * @param d - Standrad d3 data passed to each chord. Contains of source and target
     * @param sourceDetail - Details of the source entity, taken from initial dataset definition
     * @param targetDetail - Details of the target entity, taken from initial dataset definition
     */
    function chordClick(d, sourceDetail, targetDetail){
        // empty implementation.
    }

    /**
     * Returns function that will fade all chord excepts specified by d.index. This function could be applied
     * only to groups
     *
     * @param opacity
     */
    function fade(opacity, g){
        return function(d, index){
            g.selectAll('.chord').filter(function(_d){ return _d.source.index != index && _d.target.index != index;})
                .style('opacity', opacity);
        }
    }

    /**
     * Chord chart shows directed relationship between nodes. Constructor takes 2 parameters:
     * html element where this chart should be rendered and options for chart customization
     *
     * @example
     * var dataset = {
     *      entities : {
     *          S1 : "Source 1",
     *          S2 : "Source 2",
     *          S3 : "Source 3"
     *      },
     *
     *      relations : [
     *          { source : 'S1', target : 'S2', weight: 100 },
     *          { source : 'S1', target : 'S3', weight: 100 },
     *          { source : 'S3', target : 'S2', weight: 100 },
     *      ]
     * }
     *
     * var chartEl = document.body.appendChild(document.createElement('div'));
     *
     * var chord = new Chord(chartEl, {groupOffset : 0.2, innerRadius : 200});
     * chord.draw(dataset);
     *
     *
     * @param {HTMLElement} el  - DOM element where chart will be rendered
     * @param {module:charts/Chord~Options} opts    - Hash map of the options that customizes chart
     * @class
     * @alias module:charts/Chord
     */
    function Chord(el, opts) {
        this.el = el;

        // initializes default options
        this.opts = {
            outerRadius: 200,
            innerRadius: 170,
            padding: [50, 50, 50, 50],
            groupOffset : 0.1,

            labelOffset: 10,
            labelText : labelText,

            groupFillColor : groupFillColor,
            groupStrokeColor : groupStrokeColor,
            chordFillColor : chordFillColor,
            chordStrokeColor : chordStrokeColor,

            chordClick : chordClick
        };

        // overrides default properties with provided (if any)
        if (opts) {
            for (p in opts) {
                if (opts.hasOwnProperty(p)) {
                    this.opts[p] = opts[p]
                }
            }
        }
    }

    /**
     * Draws provided dataset
     *
     * @function
     * @param {module:charts/Chord~ChordDataset} dataset - Data for chart
     */
    Chord.prototype.draw = function (dataset) {
        var opts = this.opts;

        this.el.innerHTML = '';

        var R = opts.outerRadius,
            r = opts.innerRadius;

        var padding = opts.padding;
        if (!Array.isArray(padding)) {
            padding = [padding, padding, padding, padding];
        }

        var width = R * 2 + padding[1] + padding[3],
            height = R * 2 + padding[0] + padding[2];

        var arc = d3.svg.arc()
            .innerRadius(r)
            .outerRadius(R);

        var data = transform(dataset),
            details = data.details;

        var chord = d3.layout.chord().padding(opts.groupOffset)
            .matrix(data.matrix);

        var g = d3.select(this.el)
            .append('svg').attr('width', width).attr('height', height)
            .append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
            .attr('class', 'chord-diagram');

        // draws chord groups
        var groups = g.selectAll('path').data(chord.groups).enter().append('g');

        groups.append('path')
            .attr("d", arc)
            .attr('class', 'group')
            .style('fill', wrapGroup(opts.groupFillColor, details))
            .style('stroke', wrapGroup(opts.groupStrokeColor, details))
            .on('mouseover', fade(0.1, g))
            .on('mouseout', fade(1, g))
        ;

        //  draw text near groups
        groups.append("text")
            .each(function (d) {
                d.angle = (d.startAngle + d.endAngle) / 2;
            })
            .attr("text-anchor", function (d) {
                return d.angle > Math.PI ? "end" : null;
            })
            .attr("transform", wrapWith(calculateLabelPosition, opts))
            .text(wrapGroup(opts.labelText, details));

        // draws chords
        g.append("g")
            .selectAll("path").data(chord.chords).enter().append("path")
            .attr("d", d3.svg.chord().radius(r))
            .classed('chord', true)
            .style("fill", wrapChord(opts.chordFillColor, details))
            .style("stroke", wrapChord(opts.chordStrokeColor, details))
            .on('click', wrapChord(opts.chordClick, details));
        ;
    }

    /**
     * Creates matrix and details information required by chord chart from ChordDataset
     * For internal use only
     *
     * @private
     * @param {ChordDataset}  dataset
     */
    function transform(dataset) {
        var indices = {},
            matrix = [],
            details = [],
            entities = dataset.entities,
            relations = dataset.relations;

        // takes name of the entity and returns its index from indices hash
        // if it is not in hash - creates new entry in matrix and returns its index
        var index = function (entity) {
            if (typeof indices[entity] == 'undefined') {
                var idx = indices[entity] = matrix.length;
                matrix.push([]);
                details.push({
                    ename: entity,
                    edata: entities ? entities[entity] || null : null
                });

                // fill row and column with zeros
                for (var i = 0; i <= idx; i++) {
                    matrix[idx][i] = 0;
                    matrix[i][idx] = 0;
                }
            }

            return indices[entity];
        }

        // iterate relations and create matrix
        for (var i = 0, l = relations.length; i < l; i++) {
            var rel = relations[i],
                si = index(rel.source),
                ti = index(rel.target);

            matrix[si][ti] = +rel.weight;
        }

        return {matrix: matrix, details: details};
    }

    return Chord;

    
//    
//       /**
//         * @typedef ChordDataset
//         * @type    {Object}
//         *
//         * @property {Array.<module:charts/Chord~ChordRelationItem>} relations       Defines relations between entities
//         * @property {Object.<string, any>} [entities]    Optional information about every entity. Could be used in callbacks
//         *                                                while drawing
//         */
//
//        /**
//         * @typedef ChordRelationItem
//         * @type   Object
//         *
//         * @property {string} source - Source entity in the relation
//         * @property {string} target - Target entity in the relation
//         * @property {number} weight - Weight of the relation from source to target
//         *
//         */
//
//        /**
//         * @typedef EntityDetail
//         *
//         * @property {string} ename - Name of the entity
//         * @property {Object} edata - Extra data of the entity taken from initial dataset entities definition
//         */
//
//        /**
//         * This callback is called for each group on chart
//         *
//         * @callback    groupCallback
//         * @param   {Object}    d - standard d3 data. For groups it looks like {index, startAngle, endAngle, value}
//         * @param   {module:charts/Chord~EntityDetail}    detail - details of this entity
//         */
//
//        /**
//         * This callback is called for each chord on chart
//         *
//         * @callback    chordCallback
//         * @param   {Object}    d - standard d3 data. For chords it looks like {source : {index, startAngle, endAngle, value}, target : {index, startAngle, endAngle, value}}
//         * @param   {module:charts/Chord~EntityDetail}    sourceDetail - Details of the source entity
//         * @param   {module:charts/Chord~EntityDetail}    targetDetail - Details of the target entity
//         */
//
//        /**
//         * @typedef Options
//         *
//         * @property {number} innerRadius - Inner radius of the ring
//         * @property {number} outerRadius - Outer radius of the ring
//         * @property {number} padding - Padding from the edge of the svg to the ring
//         * @property {number} labelOffset - Offset of the label from outer ring
//         * @property {number} groupOffset - Offset between groups on the ring measured in radians
//         *
//         * @property {string|module:charts/Chord~groupCallback} groupFillColor - Fill color for the group on the ring.
//         * @property {string|module:charts/Chord~chordCallback} chordFillColor - Fill color for each chord
//         * @property {string|module:charts/Chord~groupCallback} groupStrokeColor - Stroke color for the group on the ring.
//         * @property {string|module:charts/Chord~chordCallback} chordStrokeColor - Stroke color for each chord.
//         
//         * @property {module:charts/Chord~groupCallback} labelText - Text for each group
//         *
//         */
//
//        var colorRange = d3.scale.category10();
//
//        /**
//         * Creates function that will be passed to d3 from provided callback and entities details array
//         * Callback is supposed to be called as (d, entity), passing standard d3 'd' and extra entity parameter
//         *
//         * @param {function} callback - Function with (d, entity) arguments
//         * @param details - Information about entities
//         */
//        function wrapGroup(callback, details) {
//            return function (d) {
//                return callback.call(this, d, details[d.index]);
//            }
//        }
//
//        /**
//         * Creates function that will be passed to d3. Provided callback is supposed to take standard d3 'd' argument
//         * and details for d.source and d.target
//         *
//         * @param callback
//         * @param entities
//         */
//        function wrapChord(callback, details) {
//            return function (d) {
//                return callback.call(this, d, details[d.source.index], details[d.target.index]);
//            }
//        }
//
//        /**
//         * Wraps provided callback to be called with extra arguments
//         * @param callback
//         */
//        function wrapWith(/*callback, ..opts?*/) {
//            var args = Array.prototype.slice.call(arguments, 0),
//                    callback = args.shift();
//
//            return function (d) {
//                return callback.apply(this, [d].concat(args));
//            }
//        }
//
//        /**
//         * Returns text value for group. Dedfault implementation takes entity name
//         *
//         * @param d
//         * @param detail
//         * @returns {string}
//         */
//        function labelText(d, detail) {
//            return detail.ename;
//        }
//
//        /**
//         * Calculates position of the labels for groups
//         *
//         * @param d
//         * @returns {string}
//         */
//        function calculateLabelPosition(d, opts) {
//            return 'rotate(' + (d.angle * 180 / Math.PI - 90) + ')' + 'translate(' + (opts.outerRadius + opts.labelOffset) + ')' +
//                    (d.angle > Math.PI ? 'rotate(180)' : "");
//        }
//
//        /**
//         * Default group fill color callback
//         */
//        function groupFillColor(d, detail) {
//            return colorRange(d.index);
//        }
//
//        /**
//         * Default group stroke color callback
//         */
//        function groupStrokeColor(d, detail) {
//            return d3.rgb(colorRange(d.index)).darker();
//        }
//
//        /**
//         * Returns chord fill color
//         *
//         * @param d
//         * @param sourceDetail
//         * @param targetDetail
//         */
//        function chordFillColor(d, sourceDetail, targetDetail) {
//            return colorRange(d.source.index);
//        }
//
//        /**
//         * Returns chord stroke color
//         *
//         * @param d
//         * @param sourceDetail
//         * @param targetDetail
//         */
//        function chordStrokeColor(d, sourceDetail, targetDetail) {
//            return d3.rgb(colorRange(d.source.index)).darker();
//        }
//
//        /**
//         * Returns function that will fade all chord excepts specified by d.index
//         * @param opacity
//         */
//        function fade(opacity, g) {
//            return function (d, index) {
//                g.selectAll('.chord').filter(function (_d) {
//                    return _d.source.index != index && _d.target.index != index;
//                })
//                        .style('opacity', opacity);
//            }
//        }
//
//        /**
//         * Chord chart shows directed relationship between nodes. Constructor takes 2 parameters:
//         * html element where this chart should be rendered and options for chart customization
//         *
//         * @example
//         * var Chord = require('charts/Chord');
//         * var dataset = {
//         *      entities : {
//         *          S1 : "Source 1",
//         *          S2 : "Source 2",
//         *          S3 : "Source 3"
//         *      },
//         *
//         *      relations : [
//         *          { source : 'S1', target : 'S2', weight: 100 },
//         *          { source : 'S1', target : 'S3', weight: 100 },
//         *          { source : 'S3', target : 'S2', weight: 100 },
//         *      ]
//         * }
//         *
//         * var chartEl = document.body.appendChild(document.createElement('div'));
//         *
//         * var chord = new Chord(chartEl, {groupOffset : 0.2, innerRadius : 200});
//         * chord.draw(dataset);
//         *
//         *
//         * @param {HTMLElement} el  - DOM element where chart will be rendered
//         * @param {module:charts/Chord~Options} opts    - Hash map of the options that customizes chart
//         * @class
//         * @alias module:charts/Chord
//         */
//        function Chord(el, opts) {
//            this.el = el;
//
//            // initializes default options
//            this.opts = {
//                outerRadius: 200,
//                innerRadius: 170,
//                padding: [50, 50, 50, 50],
//                groupOffset: 0.1,
//                labelOffset: 10,
//                labelText: labelText,
//                groupFillColor: groupFillColor,
//                groupStrokeColor: groupStrokeColor,
//                chordFillColor: chordFillColor,
//                chordStrokeColor: chordStrokeColor
//            };
//
//            // overrides default properties with provided (if any)
//            if (opts) {
//                for (p in opts) {
//                    if (opts.hasOwnProperty(p)) {
//                        this.opts[p] = opts[p]
//                    }
//                }
//            }
//        }
//
//        /**
//         * Draws provided dataset
//         *
//         * @function
//         * @param {module:charts/Chord~ChordDataset} dataset - Data for chart
//         */
//        Chord.prototype.draw = function (dataset) {
//            var opts = this.opts;
//
//            this.el.innerHTML = '';
//
//            var R = opts.outerRadius,
//                    r = opts.innerRadius;
//
//            var padding = opts.padding;
//            if (!Array.isArray(padding)) {
//                padding = [padding, padding, padding, padding];
//            }
//
//            var width = R * 2 + padding[1] + padding[3],
//                    height = R * 2 + padding[0] + padding[2];
//
//            var arc = d3.svg.arc()
//                    .innerRadius(r)
//                    .outerRadius(R);
//
//            var data = transform(dataset),
//                    details = data.details;
//
//            var chord = d3.layout.chord().padding(opts.groupOffset)
//                    .matrix(data.matrix);
//
//            var g = d3.select(this.el)
//                    .append('svg').attr('width', width).attr('height', height)
//                    .append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
//                    .attr('class', 'chord-diagram');
//
//            // draws chord groups
//            var groups = g.selectAll('path').data(chord.groups).enter().append('g');
//
//            groups.append('path')
//                    .style('fill', wrapGroup(opts.groupFillColor, details))
//                    .style('stroke', wrapGroup(opts.groupStrokeColor, details))
//                    .attr("d", arc)
//                    .on('mouseover', fade(0.1, g))
//                    .on('mouseout', fade(1, g))
//                    ;
//
//            //  draw text near groups
//            groups.append("text")
//                    .each(function (d) {
//                        d.angle = (d.startAngle + d.endAngle) / 2;
//                    })
//                    .attr("text-anchor", function (d) {
//                        return d.angle > Math.PI ? "end" : null;
//                    })
//                    .attr("transform", wrapWith(calculateLabelPosition, opts))
//                    .text(wrapGroup(opts.labelText, details));
//
//            // draws chords
//            g.append("g")
//                    .selectAll("path")
//                    .data(chord.chords)
//                    .enter().append("path")
//                    .attr("d", d3.svg.chord().radius(r))
//                    .classed('chord', true)
//                    .style("fill", wrapChord(opts.chordFillColor, details))
//                    .style("stroke", wrapChord(opts.chordStrokeColor, details));
//        }
//
//        /**
//         * Creates matrix and details information required by chord chart from ChordDataset
//         * For internal use only
//         *
//         * @private
//         * @param {ChordDataset}  dataset
//         */
//        function transform(dataset) {
//            var indices = {},
//                    matrix = [],
//                    details = [],
//                    entities = dataset.entities,
//                    relations = dataset.relations;
//
//            // takes name of the entity and returns its index from indices hash
//            // if it is not in hash - creates new entry in matrix and returns its index
//            var index = function (entity) {
//                if (typeof indices[entity] == 'undefined') {
//                    var idx = indices[entity] = matrix.length;
//                    matrix.push([]);
//                    details.push({
//                        ename: entity,
//                        edata: entities[entity] || null
//                    });
//
//                    // fill row and column with zeros
//                    for (var i = 0; i <= idx; i++) {
//                        matrix[idx][i] = 0;
//                        matrix[i][idx] = 0;
//                    }
//                }
//
//                return indices[entity];
//            }
//
//            // iterate relations and create matrix
//            for (var i = 0, l = relations.length; i < l; i++) {
//                var rel = relations[i],
//                        si = index(rel.source),
//                        ti = index(rel.target);
//
//                matrix[si][ti] = +rel.weight;
//            }
//
//            return {matrix: matrix, details: details};
//        }
//
//        return Chord;
    
});




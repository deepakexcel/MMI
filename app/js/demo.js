require({
    baseUrl: './js',
    urlArgs: 'bust=' + Date.now(),

    paths: {
        'charts': 'charts',
        'mock': 'mock',
        'd3': 'd3/d3',
        'text': 'requirejs-text/text',
        'start':'../statrup/StartCtrl'
    
    }
}, ['d3', 'charts/Chord','start'], function (d3, Chord, dataset1, dataset2,start) {

});

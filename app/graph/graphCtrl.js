
//http://api.otrsw.co.za/mmi/test/depexplorer/objectives for ex2
//http://api.otrsw.co.za/mmi/test/depexplorer/capabilities for ex1
graphMod.controller('graphCtrl', function (chord, ajaxRequest, $scope, $rootScope, $stateParams) {
    var self = this;

//checking the graph selection
    console.log($stateParams.graph);
    $scope.view = $stateParams.graph + ' Dependency Graph'; //setting the page heading
    window.document.title = $scope.view;

    $scope.spinner = true;   // hiding and showing spinner ,for charts loading
    var Chord = chord;       //Chord service variable
    //function to create graph 
    self.graph = function (dataset) {
        var chartEl = document.getElementById('demo');

        // Creates chord diagram and draws to element
        var chord = new Chord(chartEl);
        chord.draw(dataset);
    };
    //checking url according to the view
    if ($stateParams.graph == 'Capabilities')
    {

        url = "depexplorer/capabilities";
    }
    else
    {

        url = "depexplorer/objectives";

    }

    //funcion to get graph data and call graph() to create graph
    self.ajax = function (url) {
        var promise = ajaxRequest.send(url);
        promise.then(function (data) {
            $scope.spinner = false;
            self.graph(data);
        });
        promise.catch(function (e) {
            console.log(e);
        });
    };
    self.ajax(url);

});
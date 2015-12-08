'use strict';
var dashMod = angular.module('MMI.bclink', ['MMI.ajaxService', 'ngStorage']);
dashMod.controller('CapabilityLinkCtrl', ['$scope', 'ajaxRequest', '$q', '$timeout',
    function ($scope, ajaxRequest, $q, $timeout) {
        window.document.title = "Business Capability Linker";
        $scope.model_title = 'Link Business Capabilities';
        $scope.matching_bclist = [];

        //OK Here I want to keep info about the link state
        var linkContext = new Object();
        linkContext.bi = 1;
        linkContext.bu = 1;

        $scope.bclinkcontext = linkContext;

        console.log('HS: ', $scope.bclinkcontext);

        $scope.page = 1;
        $scope.order = 'ASC';
        $scope.size = 5;
        $scope.search = '';

        //$scope.reload = function () {
            

            
            //var aurl = 'grids/bclink/' + $scope.page + '/id/' + $scope.order + '/' + $scope.size + '/?search=' + $scope.search;
            //console.log('Reloading: URL :', aurl);
            //var ajax = ajaxRequest.send(aurl);
        var ajax = ajaxRequest.send('grids/bclink/1/id/ASC/5/2?search=d&p=x&dada=665');
        
            // var ajax = ajaxRequest.sendApi('data/list.json');
            ajax.then(function (data) 
            {
                console.log('We got data back from AJAX');
                for (var i = 0; i < data.length; i++) {
                    data[i].status = false;
                }
                console.log('Data length is ', data.length);
                console.log('Data is', data);
                console.log('Now assign to list');
                $scope.matching_bclist = data;
                console.log($scope);
                $scope.loading = false;
            });
            $scope.$apply;

        //};

        //$scope.reload();

        
        $scope.howzit = function (item, index, kind) 
        {
            console.log('Howzit back at ya', item, index, kind);
        }

        $scope.findCapabilitiesRecord = function () 
        {
            $scope.reload();
        }

    }
]);
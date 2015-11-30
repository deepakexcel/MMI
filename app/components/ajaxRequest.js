'use strict';

var ajaxService = angular.module('MMI.ajaxService', []);
ajaxService.factory('ajaxRequest',
        ['$http', '$q', '$log',
            function ($http, $q, $log) {
                return {
                    url: function (api) {
                        return 'http://api.otrsw.co.za/mmi/test/' + api;
                    },
                    sendApi: function (url) {

                        var def = $q.defer();
//                        delete $http.defaults.headers.common['X-Requested-With'];
                        var http = $http({
                            url: url,
                            cache: false,
                            timeout: 60000
                        });
                        http.success(function (data) {
                            def.resolve(data);
                        });
                        http.error(function (data) {
                            def.reject(data);
                        });
                        return def.promise;
                    },
                    send: function (api, data, method) {
			console.log("under Ajax");
	
                        var self = this;
                        if (!angular.isDefined(method)) {
                            method = 'POST';
                        } else {
                            if (method === true) {
                                method = 'POST';
                            }
                        }
                        var def = $q.defer();
//                        delete $http.defaults.headers.common['X-Requested-With'];
                        var http = $http({
                            url: this.url(api),
                            method: method,
                            headers: {'Content-Type': 'application/json;charset=utf-8'},
                            cache: false,
                            data: JSON.stringify(data),
                            timeout: 60000
                        });
                        http.success(function (data) {
				console.log(data);
				
                            def.resolve(data);
				return data;
				
                        });
                        http.error(function (data) {
				console.log(data);
				
                            def.reject(data);
				return data;
                        });
                        return def.promise;
                    }
                };
            }
        ]);


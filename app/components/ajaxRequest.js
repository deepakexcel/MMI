'use strict';
var ajaxService = angular.module('OnTheRock.ajaxService', []);
ajaxService.factory('ajaxRequest',
        ['$http', '$q', '$log',
            function ($http, $q, $log) {
                return {
                    url: function (api) {
                        return 'http://127.0.0.1:3000/' + api;
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
                            def.resolve(data);
                        });
                        http.error(function (data) {
                            def.reject(data);
                        });
                        return def.promise;
                    }
                };
            }
        ]);
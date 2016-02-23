(function () {
    'use strict';

    angular.module('app.common').factory('ApiService', ApiService);


    function ApiService(AppConfig, $http, $q, CacheFactory) {
        return {
            get:  get,
            post: post
        };

        /**
         *
         * @param {string} uri
         * @param {string} query
         * @param {object} options $http options
         * @param {function} dataAccessor
         * @param {boolean} bustCache
         * @returns {Promise.<T>}
         */
        function get(uri, query, options, dataAccessor, bustCache) {

            if (!dataAccessor) {
                dataAccessor = function (response) {
                    return response.data.data;
                }
            }

            if (query) {
                uri = uri + '?' + query;
            }

            if (!options) {
                options = {cache: true};
            }

            if (bustCache) {
                CacheFactory.get('defaultCache').remove(AppConfig.apiUri + uri);
            }


            return $http.get(AppConfig.apiUri + uri, options)
                .then(function (response) {
                        return $q.when(dataAccessor(response));
                    },
                    function (response) {
                        return $q.reject(dataAccessor(response));
                    }
                );
        }

        /**
         *
         * @param {string} uri
         * @param {object} data
         * @param {string} query
         * @returns {Promise.<T>}
         */
        function post(uri, data, query) {
            if (query) {
                uri = uri + '?' + query;
            }

            return $http.post(AppConfig.apiUri + uri, data)
                .then(function (response) {
                        CacheFactory.clearAll();
                        return $q.when(response.data);
                    },
                    function (response) {
                        return $q.reject(response.data);
                    }
                );
        }
    }
})();

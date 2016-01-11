angular.module('QQ')
    .factory('ApiService', ApiService);

function ApiService(ApiConfig, $http, $q, CacheFactory) {
    return {
        get: get,
        post: post
    };

    function get(uri, query, options, dataAccessor) {

        if (!dataAccessor) {
            dataAccessor = function (response) {
                return response.data.data;
            }
        }

        if (query) {
            uri = uri + '?' + query;
        }

        if (! options) {
            options = {cache: true};
        }

        return $http.get(ApiConfig.url + uri, options)
            .then(function (response) {
                    return $q.when(dataAccessor(response));
                },
                function (response) {
                    return $q.reject(dataAccessor(response));
                }
            );
    }

    function post(uri, data) {
        return $http.post(ApiConfig.url + uri, data)
            .then(function(response){
                    CacheFactory.clearAll();
                    return $q.when(response.data);
                },
                function(response){
                    return $q.reject(response.data);
                }
            );
    }
}

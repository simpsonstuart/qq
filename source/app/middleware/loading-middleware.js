angular.module('QQ')

    .factory('LoadingMiddleware', LoadingMiddleware);

function LoadingMiddleware($q, ApiConfig) {
    return {
        request: function (config) {
            return config || $q.when(config);
        }
    };
}

angular.module('QQ')

    .factory('LoadingMiddleware', LoadingMiddleware);

function LoadingMiddleware($q, AppConfig) {
    return {
        request: function (config) {
            return config || $q.when(config);
        }
    };
}

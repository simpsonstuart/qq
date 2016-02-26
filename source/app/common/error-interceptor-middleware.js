(function () {
    'use strict';
    angular.module('app.common')
        .factory("HttpErrorInterceptor", HttpErrorInterceptor);
    HttpErrorInterceptor.$inject = ['$q', '$location', '$injector'];

    function HttpErrorInterceptor($q, $location, $injector) {
        var middleware = this;
        middleware.responseError = responseError;
        return middleware;

        function responseError(response) {
            if (response.status === 401) {
                var AuthService = $injector.get('AuthService');
                AuthService.logOut();
                $location.path('/login');
                return $q.reject(response);
            }
            else {
                return $q.reject(response);
            }
        }
    }
})();

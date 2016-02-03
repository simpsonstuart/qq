(function () {
    'use strict';
    angular.module('app.common')
        .factory('KeyMiddleware', KeyMiddleware);

    function KeyMiddleware() {
        var middleware = this;
        middleware.link = link;

        return middleware;

        function link(scope, $location, $state, AuthService) {
            scope.$on('$stateChangeStart', function (event, next) {
                if (next.restricted && (false === AuthService.loggedIn())) {
                    event.preventDefault();
                    $state.go('login');
                }
            });
        }
    }

})();

(function () {
    'use strict';
    angular.module('app.hamburger')
        .controller('hamburgerController', hamburgerController);

    function hamburgerController($scope, $state, AuthService) {
        var ctrl = this;
        ctrl.logOut = logOut;

        function logOut() {
            AuthService.logOut();

            $state.go('login');
        }
    }
})();

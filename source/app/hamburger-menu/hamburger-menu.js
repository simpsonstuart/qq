(function () {
    'use strict';
    angular.module('app.hamburger-menu')
        .controller('hamburgerMenu', hamburgerMenu);

    function hamburgerMenu($scope, $state, AuthService) {
        var ctrl = this;
        ctrl.logOut = logOut;

        function logOut() {
            AuthService.logOut();

            $state.go('login');
        }
    }
})();

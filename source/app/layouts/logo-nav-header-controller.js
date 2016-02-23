(function () {
    'use strict';
    angular.module('app')
        .controller('LogoNavHeaderController', LogoNavHeaderController);

    function LogoNavHeaderController(AuthService, $state) {
        var ctrl = this;
        ctrl.logOut = logOut;


        function logOut() {
            AuthService.logOut();

            $state.go('login');
        }
    }

})();

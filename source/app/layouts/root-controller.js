(function () {
    'use strict';
    angular.module('app')
        .controller('RootController', RootController);

    function RootController($scope, AuthService, $state) {
        var ctrl = this;
        ctrl.logOut = logOut;

        function logOut() {
            AuthService.logOut();

            $state.go('login');
        }
    }

})();

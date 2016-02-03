(function () {
    'use strict';
    angular.module('app')
        .controller('HeaderController', HeaderController);

    function HeaderController(AuthService, $state) {
        var ctrl = this;
        ctrl.logOut = logOut;
        ctrl.syncSalesforce = syncSalesforce;

        function logOut() {
            AuthService.logOut();

            $state.go('login');
        }

        function syncSalesforce() {
            alert("Implement me!");
        }
    }

})();

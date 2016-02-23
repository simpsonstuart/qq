(function () {
    'use strict';
    angular.module('app')
        .controller('DefaultHeaderController', DefaultHeaderController);

    function DefaultHeaderController(AuthService, $state, UserService) {
        var ctrl = this;
        ctrl.logOut = logOut;
        ctrl.syncSalesforce = syncSalesforce;
        ctrl.syncCount = 0;

        _activate();

        function logOut() {
            AuthService.logOut();

            $state.go('login');
        }

        function syncSalesforce() {
            alert("Implement me!");
        }

        function _activate() {
            UserService.syncCount().then(function (response) {
                ctrl.syncCount = response.count;
            }, function (response) {
                ctrl.syncCount = 'E';
            });
        }
    }

})();

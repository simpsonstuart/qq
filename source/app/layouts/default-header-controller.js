(function () {
    'use strict';
    angular.module('app')
        .controller('DefaultHeaderController', DefaultHeaderController);

    function DefaultHeaderController(AuthService, $state, UserService, $rootScope) {
        var ctrl = this;
        ctrl.logOut = logOut;
        ctrl.syncSalesforce = syncSalesforce;
        ctrl.syncCount = 0;

        _activate();

        $rootScope.$on('Synced', function () {
            _getSyncCount(true);
        });

        function logOut() {
            AuthService.logOut();

            $state.go('login');
        }

        function syncSalesforce() {
            alert("Implement me!");
        }

        function _activate() {
            _getSyncCount();
        }

        function _getSyncCount(bustCache) {
            UserService.syncCount(bustCache).then(function (response) {
                if (!response.count) {
                    ctrl.syncCount = 0;
                }

                ctrl.syncCount =  response.count;
            }, function (response) {
                ctrl.syncCount =  'E';
            });
        }
    }

})();

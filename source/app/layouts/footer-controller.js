(function () {
    'use strict';
    angular.module('app')
        .controller('FooterController', FooterController);

    function FooterController($state, UserService, $rootScope) {
        var ctrl = this;
        ctrl.getSyncCount = getSyncCount;

        activate();

        $rootScope.$on('Synced', function () {
            _getSyncCount(true);
        });

        function getSyncCount() {
            return UserService.getSyncCount();
        }

        function activate() {
            _getSyncCount();

            //highlight the feed tab only by default
            if ($state.is('settings')) {
                ctrl.HomeActive = true;
                ctrl.DealsActive = false;
                ctrl.NSActive = false;
                ctrl.SyncActive = false;
            } else if ($state.is('deal-list')) {
                ctrl.HomeActive = false;
                ctrl.DealsActive = true;
                ctrl.NSActive = false;
                ctrl.SyncActive = false;
            } else if ($state.is('next-steps')) {
                ctrl.HomeActive = false;
                ctrl.DealsActive = false;
                ctrl.NSActive = true;
                ctrl.SyncActive = false;
            } else if ($state.is('sync')) {
                ctrl.HomeActive = false;
                ctrl.DealsActive = false;
                ctrl.NSActive = false;
                ctrl.SyncActive = true;
            }
        }

        function _getSyncCount(bustCache) {
            UserService.syncCount(bustCache).then(function (response) {
                if (!response.count) {
                    UserService.setSyncCount(0);
                }

                UserService.setSyncCount(response.count);
            }, function (response) {
                UserService.setSyncCount('E');
            });
        }
    }
})();

(function () {
    'use strict';
    angular.module('app')
        .controller('DefaultHeaderController', DefaultHeaderController);

    function DefaultHeaderController(AuthService, $state, UserService, $rootScope) {
        var ctrl = this;
        ctrl.logOut = logOut;
        ctrl.syncSalesforce = syncSalesforce;
        ctrl.clicked = clicked;
        ctrl.MenuClicked = false;
        ctrl.getSyncCount = getSyncCount;
        ctrl.isShown = {'display': 'block'};

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

        function getSyncCount() {
            return UserService.getSyncCount();
        }

        function _activate() {
            _getSyncCount();
        }


        function clicked (){
            ctrl.MenuClicked = ! ctrl.MenuClicked;
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

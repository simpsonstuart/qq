(function () {
    'use strict';
    angular.module('app')
        .controller('DefaultHeaderController', DefaultHeaderController);

    function DefaultHeaderController(AuthService, $state, UserService, $rootScope, AppConfig) {
        var ctrl = this;
        ctrl.logOut = logOut;
        ctrl.clicked = clicked;
        ctrl.MenuClicked = false;
        ctrl.moreClicked = moreClicked;
        ctrl.getSyncCount = getSyncCount;

        if(AppConfig.platform === 'web') {
            ctrl.moreShown = true;
            ctrl.hoverShown = false;
        }

        _activate();

        $rootScope.$on('Synced', function () {
            _getSyncCount(true);
        });

        function logOut() {
            AuthService.logOut();

            $state.go('login');
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

        function moreClicked (){
            if(AppConfig.platform === 'android' || AppConfig.platform === 'ios'){
                ctrl.moreShown = ! ctrl.moreShown;
                ctrl.hoverShown = ! ctrl.hoverShown;
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

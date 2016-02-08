(function () {
    'use strict';
    angular.module('app')
        .controller('FooterController', FooterController);

    function FooterController($scope, $state) {
        var ctrl = this;

        activate();

        function activate() {
            //highlight the feed tab only by default
            if($state.is('settings')){
                ctrl.HomeActive = true;
                ctrl.DealsActive = false;
                ctrl.NSActive = false;
                ctrl.SyncActive = false;
            }else if ($state.is('deal-list')){
                ctrl.HomeActive = false;
                ctrl.DealsActive = true;
                ctrl.NSActive = false;
                ctrl.SyncActive = false;
            }else if ($state.is('next-steps')){
                ctrl.FeedActive = false;
                ctrl.DealsActive = false;
                ctrl.NSActive = true;
                ctrl.AskActive =false;
            }else if ($state.is('sync')){
                ctrl.HomeActive = false;
                ctrl.DealsActive = false;
                ctrl.NSActive = false;
                ctrl.SyncActive = true;
            }
        }
    }
})();

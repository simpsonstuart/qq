(function () {
    'use strict';
    angular.module('app')
        .controller('FooterController', FooterController);

    function FooterController($scope, $state) {
        var ctrl = this;

        activate();

        function activate() {
            //highlight the feed tab only by default
            if($state.is('feed')){
                ctrl.FeedActive = true;
                ctrl.DealsActive = false;
                ctrl.NSActive = false;
                ctrl.AskActive = false;
            }else if ($state.is('deal-list')){
                ctrl.FeedActive = false;
                ctrl.DealsActive = true;
                ctrl.NSActive = false;
                ctrl.AskActive =false;
            }else if ($state.is('next-steps')){
                ctrl.FeedActive = false;
                ctrl.DealsActive = false;
                ctrl.NSActive = true;
                ctrl.AskActive =false;
            }else if ($state.is('ask-questions')){
                ctrl.FeedActive = false;
                ctrl.DealsActive = false;
                ctrl.NSActive = false;
                ctrl.AskActive =true;
            }
        }
    }
})();

(function () {
    'use strict';
    angular.module('app.get-started')
        .controller('GetStarted', GetStarted);

    function GetStarted($scope, $state, UserService) {
        var ctrl = this;
        ctrl.getStarted = getStarted;

        activate();

        function activate() {
            var token = $state.params.token;
            if (token == "false") {
                $state.go('login');
            } else {
                UserService.verify(token).then(function () {
                    ctrl.showGetStarted = true;
                }, function () {
                    console.log('error token invalid')
                });
            }
        }

        function getStarted() {
            $state.go('login');
        }

    }
})();

(function () {
    'use strict';
    angular.module('app.get-started')
        .controller('GetStarted', GetStarted);
    GetStarted.$inject = ['$state', 'UserService'];

    function GetStarted($state, UserService) {
        var ctrl = this;
        ctrl.error = false;
        ctrl.showGetStarted = false;
        ctrl.verifying = false;
        ctrl.getStarted = getStarted;

        activate();

        function activate() {
            var token = $state.params.token;
            ctrl.verifying = true;

            if (token == "verified") {
                $state.go('login');
            } else {
                UserService.verify(token).then(function () {
                    ctrl.verifying = false;
                    ctrl.showGetStarted = true;
                }, function () {
                    ctrl.verifying = false;
                    ctrl.error = true;
                    console.log('error token invalid')
                });
            }
        }

        function getStarted() {
            $state.go('login');
        }

    }
})();

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
        ctrl.verify = verify;
        ctrl.invalidCode = false;
        ctrl.reValid = reValid;


        function verify() {
            ctrl.verifying = true;
                UserService.verify(ctrl.verifyCode).then(function () {
                    ctrl.verifying = false;
                    ctrl.invalidCode = false;
                    $state.go('link-with-salesforce');
                }, function () {
                    ctrl.verifying = false;
                    ctrl.invalidCode = true;
                });

        }

        function reValid() {
            ctrl.invalidCode = false;
        }
    }
})();

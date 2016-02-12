(function () {
    'use strict';
    angular.module('app.registration-confirmation')
        .controller('RegistrationConfirmation', RegistrationConfirmation);

    function RegistrationConfirmation($scope, $state, UserService) {
        var ctrl = this;
        ctrl.verificationResent = false;
        ctrl.resendVerification = resendVerification;

        function resendVerification() {
            UserService.resendVerificationEmail($state.params.email).then(function () {
                ctrl.verificationResent = true;
            }, function () {
                console.log('error sending verification email')
            });
        }

    }
})();

(function () {
    'use strict';
    angular.module('app.registration-confirmation')
        .controller('RegistrationConfirmation', RegistrationConfirmation);

    function RegistrationConfirmation($state, UserService, UrlService) {
        var returnUrl = UrlService.urlWithoutPath() + '/get-started';

        var ctrl = this;
        ctrl.verificationResent = false;
        ctrl.sendError = false;
        ctrl.resendVerification = resendVerification;

        function resendVerification() {
            UserService.resendVerificationEmail($state.params.email, returnUrl).then(function () {
                ctrl.verificationResent = true;
            }, function () {
                ctrl.sendError = true;
                console.log('error sending verification email')
            });
        }

    }
})();

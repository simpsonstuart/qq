(function () {
    'use strict';
    angular.module('app.registration-confirmation')
        .controller('RegistrationConfirmation', RegistrationConfirmation);

    function RegistrationConfirmation($state, UserService, UrlService, $timeout) {
        var returnUrl = UrlService.urlWithoutPath() + '/get-started';

        var ctrl = this;
        ctrl.verificationResent = false;
        ctrl.sendError = false;
        ctrl.resendVerification = resendVerification;
        resendWait();

        function resendVerification() {
            UserService.resendVerificationEmail($state.params.email, returnUrl).then(function () {
                ctrl.verificationSent = true;
                ctrl.resendEnabled = false;
                ctrl.verificationSent = true;
                resendWait();
            }, function () {
                ctrl.sendError = true;
                ctrl.verificationSent = false;
                ctrl.resendEnabled = false;
                resendWait();
            });
        }

        //makes the user wait 5 seconds before being able to resend email
        function resendWait() {
            ctrl.countDown = 6;
            runCounter();

            function runCounter() {
                ctrl.showCountdown = true;
                ctrl.countDown -= 1;
                if ( ctrl.countDown > 0)
                    $timeout(runCounter, 1000);

                if(ctrl.countDown <= 0) {
                    ctrl.resendEnabled = true;
                    ctrl.showCountdown = false;
                    ctrl.sendError = false;
                }
            }


            }
        }
})();

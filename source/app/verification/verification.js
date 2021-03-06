(function () {
    'use strict';
    angular.module('app.verification')
        .controller('Verification', Verification);
    Verification.$inject = ['$state', 'UserService', '$timeout', 'AuthService'];

    function Verification($state, UserService, $timeout, AuthService) {
        var ctrl = this;
        var returnUrl = '/login';
        ctrl.error = false;
        ctrl.showVerification = false;
        ctrl.verifying = false;
        ctrl.verify = verify;
        ctrl.invalidCode = false;
        ctrl.reValid = reValid;
        ctrl.verificationResent = false;
        ctrl.sendError = false;
        ctrl.resendVerification = resendVerification;


        function verify() {
            ctrl.verifying = true;
                UserService.verify(ctrl.verifyCode).then(function () {
                    ctrl.verifying = false;
                    ctrl.invalidCode = false;
                    UserService.profile('current').then(function (data) {
                        AuthService.createTokenExpirationTime();
                        AuthService.setUser(data);
                    }).then(function () {
                        $state.go('link-with-salesforce');
                    });
                }, function () {
                    ctrl.verifying = false;
                    ctrl.invalidCode = true;
                    ctrl.resendEnabled = true;
                });

        }

        function reValid() {
            ctrl.invalidCode = false;
        }

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

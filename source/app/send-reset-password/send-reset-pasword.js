(function () {
    'use strict';
    angular.module('app.send-reset-password')
        .controller('SendResetPassword', SendResetPassword);
    SendResetPassword.$inject = ['$scope', '$state', 'UserService', 'UrlService'];

    function SendResetPassword($scope, $state, UserService, UrlService) {
        var returnUrl    = UrlService.urlWithoutPath() + '/reset-password';
        var ctrl = this;
        ctrl.tryAgain = tryAgain;
        ctrl.send = send;
        ctrl.email = null;
        ctrl.sent = false;
        ctrl.sendError = false;
        ctrl.sending = false;
        ctrl.emailInvalid = false;
        ctrl.emailVerify = emailVerify;

        _activate();

        function send() {
            ctrl.sending = true;
            _sendEmail();
        }

        function tryAgain() {
            ctrl.sendError = false;
            ctrl.sending = true;
            _sendEmail();
        }

        function _sendEmail() {
            UserService.sendPasswordReset(ctrl.email, returnUrl).then(function() {
                ctrl.sending = false;
                $state.go('login', {reset_success: true});
            }, function () {
                ctrl.sending = false;
                ctrl.sendError = true;
            });
        }

        function emailVerify() {
            var reg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/;
            if (reg.test(ctrl.email)){

                ctrl.emailInvalid = false;
            }
            else{
                ctrl.emailInvalid = true;
                $scope.password_reset_form.$invalid = true;
            }
        }

        function _activate() {
        }
    }
})();

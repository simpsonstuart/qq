(function () {
    'use strict';
    angular.module('app.registration-confirmation')
        .controller('RegistrationConfirmation', RegistrationConfirmation);

    function RegistrationConfirmation($scope, $state, UserService) {
        var ctrl = this;
        ctrl.showMessageResent = false;
        ctrl.resendVerification = resendVerification;

        function resendVerification(){
         ctrl.showMessageResent = true;
        }

    }
})();

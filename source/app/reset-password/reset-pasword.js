(function () {
    'use strict';
    angular.module('app.reset-password')
        .controller('Reset-Password', ResetPassword);

    function ResetPassword($scope, $state, UserService) {
        var ctrl = this;
        ctrl.reset = reset;

        function reset() {
            UserService.reset_password((function () {
                return { 'email': $scope.email};
            })()).then(function(){
                $state.go('login');
            });
        }
    }
})();

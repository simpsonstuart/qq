(function () {
    'use strict';
    angular.module('app.registration')
        .controller('Registration', Registration);

    function Registration($scope, $state, UserService) {
        var ctrl = this;
        ctrl.register = register;

        function register() {
            UserService.register((function () {
                return { 'email': $scope.email, 'username': $scope.username, 'password': $scope.confirm_password };
            })()).then(function(){
                $state.go('registration-confirmation', {email: $scope.email});
            });
        }
    }
})();

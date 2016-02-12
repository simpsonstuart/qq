(function () {
    'use strict';
    angular.module('app.registration')
        .controller('Registration', Registration);

    function Registration($scope, $state, UserService, UrlService) {
        var ctrl = this;
        var returnUrl = UrlService.urlWithoutQuery() + '/get-started/';
        ctrl.register = register;

        function register() {
            UserService.register((function () {
                return { 'email': $scope.email, 'username': $scope.username, 'password': $scope.confirm_password, 'return_uri': returnUrl};
            })()).then(function(){
                $state.go('registration-confirmation', {email: $scope.email});
            });
        }
    }
})();

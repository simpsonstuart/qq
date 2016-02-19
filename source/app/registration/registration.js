(function () {
    'use strict';
    angular.module('app.registration')
        .controller('Registration', Registration);

    function Registration($scope, $state, UserService, UrlService) {
        var ctrl = this;
        var returnUrl = UrlService.urlWithoutPath() + '/get-started';
        ctrl.register = register;

        function register() {
            UserService.register((function () {
                return { 'email': $scope.email, 'password': $scope.pw2, 'return_url': returnUrl};
            })()).then(function(){
                $state.go('registration-confirmation', {email: $scope.email});
            });
        }
    }
})();

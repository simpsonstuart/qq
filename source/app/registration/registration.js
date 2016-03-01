(function () {
    'use strict';
    angular.module('app.registration')
        .controller('Registration', Registration);

    function Registration($scope, $state, UserService, UrlService) {
        var ctrl         = this;
        var returnUrl    = UrlService.urlWithoutPath() + '/get-started';
        ctrl.register    = register;
        ctrl.emailVerify = emailVerify;

        function register() {
            console.log({'email': $scope.email, 'password': $scope.pw2, 'return_url': returnUrl});
            UserService.register((function () {
                return {'email': $scope.email, 'password': $scope.pw2, 'return_url': returnUrl};
            })()).then(function () {
                $state.go('registration-confirmation', {email: $scope.email});
            });
        }

        function emailVerify() {
            var reg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/;
            if (reg.test($scope.email)){

                ctrl.emailInvalid = false;
            }
            else{
                ctrl.emailInvalid = true;
                $scope.registration_form.$invalid = true;
            }
        }

    }
})();

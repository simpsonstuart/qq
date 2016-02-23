(function () {
    'use strict';
    angular.module('app.settings')
        .controller('Settings', Settings);

    function Settings($scope, AuthService, $state, UserService, $stateParams) {
        var ctrl            = this;
        var user_id         = $stateParams.user_id;
        ctrl.profile        = {};
        ctrl.password_reset = password_reset;
        ctrl.changeEmail    = email_change;
        ctrl.logOut         = logOut;
        ctrl.click_password = click_password;
        ctrl.click_email    = click_email;

        activate();

        function password_reset() {
            return UserService.changePassword('current',
                {'email': AuthService.authenticatedUser().email, 'password': $scope.current_password, 'new_password': $scope.new_password_confirm}
            )
                .then(function (response) {
                    ctrl.expand_show_password = !ctrl.expand_show_password;
                }, function (response) {
                    console.log(response);
                    ctrl.passwordError = response.message;
                });
        }

        function email_change() {
            var email = $scope.new_email;
            return UserService.changeEmail('current', {'password': $scope.current_password_email, 'email': AuthService.authenticatedUser().email,'new_email': email})
                .then(function (response) {
                    var user = AuthService.authenticatedUser();
                    user.email = email;
                    AuthService.setUser(user);
                    ctrl.profile = user;
                    ctrl.expand_show_email = !ctrl.expand_show_email;
                }, function (response) {
                    ctrl.emailError = response.message;
                });
        }


        function logOut() {
            AuthService.logOut();

            $state.go('login');
        }

        function click_password() {
            ctrl.expand_show_password = !ctrl.expand_show_password;
            $scope.current_password = '';
            $scope.new_password = '';
            $scope.new_password_confirm = '';
            $scope.password_form.$setPristine(true);
        }

        function click_email() {
            ctrl.expand_show_email = !ctrl.expand_show_email;
            $scope.current_password_email = '';
            $scope.new_email = '';
            console.log($scope.password_form);
            $scope.email_form.$setPristine(true);
        }

        function activate() {
            UserService.profile(function () {
                return user_id ? user_id : 'current';
            }()).then(function (data) {
                ctrl.profile = data;
            });
        }
    }

})();

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
        ctrl.billing_change = billing_change;
        ctrl.logOut         = logOut;
        ctrl.click_password = click_password;
        ctrl.click_email    = click_email;

        activate();

        function password_reset() {
            return UserService.changePassword('current',
                {'email': AuthService.authenticatedUser().email, 'password': $scope.current_password, 'new_password': $scope.new_password_confirm}
            )
                .then(function (response) {
                    console.log(response);
                    if (response.status === 500) {
                        console.log(response)
                    }
                    ctrl.expand_show_password = !ctrl.expand_show_password;
                }, function (response) {
                    console.log(response);
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
                    console.log(AuthService.authenticatedUser().email);

                    ctrl.expand_show_email = !ctrl.expand_show_email;
                }, function (response) {
                    if (response.status === 500) {
                        console.log(response)
                    }
                });
        }

        function billing_change() {
            return UserService.billing_change({'CCNumber': $scope.CCNumber})
                .then(function (response) {
                    console.log(response);
                    if (response.status === 500) {
                        console.log(response)
                    }
                    ctrl.expand_show_billing = !ctrl.expand_show_billing;
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

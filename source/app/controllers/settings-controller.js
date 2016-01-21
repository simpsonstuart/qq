angular.module('QQ')
    .controller('SettingsController', SettingsController);

function SettingsController($scope, AuthService, $state, UserService, $stateParams) {
    var ctrl = this;
    var user_id = $stateParams.user_id;
    ctrl.password_reset = password_reset;
    ctrl.email_change = email_change;
    ctrl.billing_change = billing_change;
    ctrl.click_account_type = click_account_type;
    ctrl.logOut = logOut;
    ctrl.isRole = isRole;
    ctrl.click_password = click_password;
    ctrl.click_billing = click_billing;
    ctrl.click_email = click_email;

    function password_reset() {
        return UserService.reset_password({
                'current_password': $scope.current_password, 'new_password': $scope.new_password_confirm})
            .then(function (response) {
                console.log(response);
                if (response.status === 500) {
                    console.log(response)
                }
                ctrl.expand_show_password = !ctrl.expand_show_password;
            });
    }

    function email_change() {
        return UserService.email_change({'current_password_email': $scope.current_password_email, 'new_email': $scope.new_email})
            .then(function (response) {
                console.log(response);
                if (response.status === 500) {
                    console.log(response)
                }
                ctrl.expand_show_email = !ctrl.expand_show_email;
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

    UserService.profile(function () {
        return user_id ? user_id : 'current';
    }()).then(function (data) {
        ctrl.profile = data;
        ctrl.virtual_team = ctrl.profile.virtual_team.data;
        ctrl.isAdmin = ctrl.isRole('admin');
        ctrl.isSalesRep = ctrl.isRole('sales-rep');
        ctrl.roleLabel = ctrl.profile.role.data.label;
    });

    function isRole(user_role) {
        return ctrl.profile.role.data.name == user_role
    }

    function logOut() {
        AuthService.logOut();

        $state.go('root.login');
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

    function click_billing() {

        ctrl.expand_show_billing = !ctrl.expand_show_billing;
        $scope.CCNumber = '';
    }

    function click_account_type() {
        ctrl.expand_show_account_type = !ctrl.expand_show_account_type;
    }
}

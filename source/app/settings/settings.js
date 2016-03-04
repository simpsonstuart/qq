(function () {
    'use strict';
    angular.module('app.settings')
        .controller('Settings', Settings);
    Settings.$inject = ['$scope', 'AuthService', '$state', 'UserService', '$stateParams', '_', 'moment'];

    function Settings($scope, AuthService, $state, UserService , $stateParams, _ , moment) {
        var ctrl            = this;
        var user_id         = $stateParams.user_id;
        var daysInMonth = [];
        ctrl.profile        = {};
        ctrl.password_reset = passwordReset;
        ctrl.changeEmail    = emailChange;
        ctrl.logOut         = logOut;
        ctrl.click_password = clickPassword;
        ctrl.click_email    = clickEmail;
        ctrl.emailVerify = emailVerify;
        ctrl.clickFiscalYear = clickFiscalYear;
        ctrl.fiscalYear = changeFiscalYear;
        ctrl.months = moment.monthsShort();
        ctrl.monthChanged = monthChanged;

        activate();
        function passwordReset() {
            return UserService.changePassword('current',
                {'email': AuthService.authenticatedUser().email, 'password': $scope.current_password, 'new_password': $scope.pw2}
                )
                .then(function (response) {
                    ctrl.expand_show_password = !ctrl.expand_show_password;
                }, function (response) {
                    ctrl.passwordError = response.message;
                });
        }
        function emailChange() {
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
        function changeFiscalYear() {
            return UserService.changeFiscalYear('current',
                {'email': AuthService.authenticatedUser().email, 'fiscalYear': $scope.newFiscalYear}
                )
                .then(function (response) {
                    ctrl.expandShowFiscalYear = !ctrl.expandShowFiscalYear;
                }, function (response) {
                    ctrl.fiscalYearError = response.message;
                });
        }
        function emailVerify() {
            var reg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/;
            if (reg.test($scope.new_email)){
                ctrl.emailInvalid = false;
            }
            else{
                ctrl.emailInvalid = true;
                $scope.email_form.$invalid = true;
            }
        }
        function logOut() {
            AuthService.logOut();
            $state.go('login');
        }
        function clickPassword() {
            ctrl.expand_show_password = !ctrl.expand_show_password;
            $scope.current_password = '';
            $scope.pw1 = '';
            $scope.pw2 = '';
            $scope.password_form.$setPristine(true);
        }
        function clickEmail() {
            ctrl.expand_show_email = !ctrl.expand_show_email;
            $scope.current_password_email = '';
            $scope.new_email = '';
            $scope.email_form.$setPristine(true);
        }
        function clickFiscalYear() {
            ctrl.expandShowFiscalYear = !ctrl.expandShowFiscalYear;
            $scope.currentFiscalYear = '';
            $scope.newFiscalYear = '';
            $scope.fiscalYearForm.$setPristine(true);
        }
        function monthChanged (selectedMonth) {
            var dateNumber = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(selectedMonth) / 3 + 1 ;
            ctrl.numberOfDays = moment(dateNumber, "MM").daysInMonth();
             ctrl.dates = _.range(1, ctrl.numberOfDays);
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
(function () {
    'use strict';
    angular.module('app.login')
        .controller('LoginController', LoginController);
    LoginController.$inject = ['$scope', 'AuthService', 'UserService', '$state'];

    function LoginController($scope, AuthService, UserService, $state) {
        var ctrl = this;
        var token = $state.params.token;
        var errorParams = $state.params.errors;
        ctrl.login = login;
        ctrl.LSError = localStorageSupported();
        ctrl.resetFail = false;
        ctrl.resetSuccess = false;
        ctrl.errors = [];

        activate();

        function login() {
            AuthService.logIn($scope.password, $scope.email).then(function (data) {
                UserService.profile('current').then(function (userObject) {
                    AuthService.createTokenExpirationTime();
                    AuthService.setUser(userObject);
                    ctrl.currentUser = userObject;
                }).then(function () {
                    // wait until the user is stored to go to feed if not first login
                    if (!ctrl.currentUser.salesforce_id) {
                        $state.go('link-with-salesforce');
                    } else {
                        $state.go('dashboard');
                    }
                });
            }).catch(function (response) {
                //if we get an an error 401 display an error and reset forms
                if (response.status === 401) {
                    ctrl.errors = [];
                    ctrl.errors.push("Invalid email or password!");
                    $scope.email = '';
                    $scope.password ='';
                    $scope.login_form.$setPristine(true);
                }
            });

        }

        //test if local storage is available
        function localStorageSupported() {
            try {
                if ('localStorage' in window && window['localStorage'] !== null)
                {
                    localStorage.setItem("testitem",true);
                    localStorage.removeItem("testitem");
                    return true;
                }
            } catch (e) {

                return false;
            }

        }

        function activate() {
            if (errorParams) {
                ctrl.errorsList.push(errorParams.split(','));
            }
            ctrl.resetSuccess = $state.params.reset_success;
            ctrl.resetFail = $state.params.resetFail;

            if (token) {
                AuthService.logIn(token).then(function () {
                    UserService.profile('current').then(function (data) {
                        AuthService.createTokenExpirationTime();
                        AuthService.setUser(data);
                    }).then(function () {
                        $state.go('dashboard');
                    });
                });
            }


            if(localStorageSupported() === false) {
                errors.push("Error local storage not supported by your browser or you are using private/incognito mode!");
            }
        }
    }

})();

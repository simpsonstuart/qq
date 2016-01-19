angular.module('QQ')
    .controller('MainLoginController', MainLoginController);

function MainLoginController($rootScope, $scope, AuthService, UserService, $state) {
    var ctrl = this;
    ctrl.login = login;
    ctrl.LSError = localStorageSupported();

    //display error if local storage not supported
    var errors = [];
    ctrl.errorsList = errors;
    if(localStorageSupported() === false) {
        errors.push("Error local storage not supported by your browser or you are using private/incognito mode!");
    }
    function login() {
        AuthService.logIn($scope.username, $scope.password).then(function (data) {
            UserService.profile('current').then(function (data) {
                var user = JSON.stringify(data);
                AuthService.createTokenExpirationTime();
                localStorage.setItem('user', user);
            }).then(function () {
                // wait until the user is stored to go to feed
                $state.go('root.feed');
            });
        }).catch(function (response) {
            //if we get an an error 401 display an error and reset forms
            if (response.status === 401) {
                errors.push("Invalid organization!");
                $scope.organization= '';
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
}

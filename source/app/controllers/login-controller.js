angular.module('QQ')
    .controller('LoginController', LoginController);

function LoginController($scope, AuthService, UserService, $state, UrlService, $window, AppConfig) {
    var ctrl = this;
    var token = $state.params.token;
    var newUser = $state.params.new_user;
    var errorParams = $state.params.errors;
    ctrl.salesforceLogin = salesforceLogin;
    ctrl.login = login;
    ctrl.LSError = localStorageSupported();

    //display error if local storage not supported
    var errors = [];
    ctrl.errorsList = errors;

    activate();

    function login() {
        AuthService.logIn($scope.password, $scope.username).then(function (data) {
            UserService.profile('current').then(function (userObject) {
                AuthService.createTokenExpirationTime();
                localStorage.setItem('user', userObject);
            }).then(function () {
                // wait until the user is stored to go to feed
                $state.go('root.profile');
            });
        }).catch(function (response) {
            //if we get an an error 401 display an error and reset forms
            if (response.status === 401) {
                errors.push("Invalid username or password!");
                $scope.username = '';
                $scope.password ='';
                $scope.login_form.$setPristine(true);
            }
        });

    }

    function salesforceLogin() {
        var query = {
            "return_uri": UrlService.urlWithoutQuery()
        };

        $window.location.href = AppConfig.oauthUrl + "oauth2/salesforce/login/?" + UrlService.makeQuery(query);

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

        if (token) {
            AuthService.logIn(token).then(function () {
                UserService.profile('current').then(function (data) {
                    var user = JSON.stringify(data);
                    AuthService.createTokenExpirationTime();
                    localStorage.setItem('user', user);
                }).then(function () {
                    if (newUser == 'true') {
                        $state.go('root.import-deals');
                    } else {
                        $state.go('root.profile');
                    }
                });
            });
        }


        if(localStorageSupported() === false) {
            errors.push("Error local storage not supported by your browser or you are using private/incognito mode!");
        }
    }
}

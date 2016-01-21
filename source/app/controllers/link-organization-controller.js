angular.module('QQ')
    .controller('LinkOrganizationController', LinkOrganizationController);

function LinkOrganizationController($scope, AppConfig, $window, AuthService, UserService, $state) {
    var token = $state.params.token;
    var ctrl = this;
    ctrl.linkOrganization = linkOrganization;

    if (token) {
        AuthService.logIn(token).then(function (data) {
            UserService.profile('current').then(function (data) {
                var user = JSON.stringify(data);
                AuthService.createTokenExpirationTime();
                localStorage.setItem('user', user);
            }).then(function () {
                // wait until the user is stored to go to feed
                $state.go('root.import-deals');
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

    function linkOrganization() {
        var query = {
            "client_secret": $scope.client_secret,
            "client_id":  $scope.client_id,
            "organization_id": $scope.organization_id,
            "return_uri": AppConfig.oauthReturnUri
        };

        $window.location.href = AppConfig.oauthUrl + "oauth2/salesforce/link-org/?" + makeQuery(query);
    }

    function makeQuery(data) {
        return Object.keys(data).map(function(key) {
            return [key, data[key]].map(encodeURIComponent).join("=");
        }).join("&");
    }
}



angular.module('QQ')
    .controller('SalesforceLoginController', SalesforceLoginController);

function SalesforceLoginController($state, $scope, AppConfig, $window, AuthService, UserService) {
    var token = $state.params.token;
    var ctrl = this;
    ctrl.getOrganization = GetOrganization;


    if (token) {
        AuthService.logIn(token);
        console.log('here');
        UserService.profile('current').then(function (data) {
            var user = JSON.stringify(data);
            localStorage.setItem('user', user);
        }).then(function () {
            // wait until the user is stored to go to feed
            $state.go('root.feed');
        });

    }

    function GetOrganization() {
        var query = {
            "organization_id": $scope.organization_id,
            "return_uri": AppConfig.oauthReturnUri
        };

        $window.location.href = AppConfig.oauthUrl + "oauth2/salesforce/login/?" + makeQuery(query);
    }

    function makeQuery(data) {
        return Object.keys(data).map(function(key) {
            return [key, data[key]].map(encodeURIComponent).join("=");
        }).join("&");
    }
}

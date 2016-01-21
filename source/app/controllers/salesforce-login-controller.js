angular.module('QQ')
    .controller('SalesforceLoginController', SalesforceLoginController);

function SalesforceLoginController($state, UrlService, $scope, AppConfig, $window, AuthService, UserService, _) {
    var token = $state.params.token;
    var errorParams = $state.params.errors;
    var ctrl = this;
    ctrl.getOrganization = GetOrganization;
    ctrl.errorsList = [];

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
                $state.go('root.feed');
            });
        });
    }

    function GetOrganization() {
        var query = {
            "organization_id": $scope.organization_id,
            "return_uri": UrlService.urlWithoutQuery()
        };

        $window.location.href = AppConfig.oauthUrl + "oauth2/salesforce/login/?" + UrlService.makeQuery(query);
    }
}

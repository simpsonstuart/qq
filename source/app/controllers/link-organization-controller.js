angular.module('QQ')
    .controller('LinkOrganizationController', LinkOrganizationController);

function LinkOrganizationController($scope, UrlService, AppConfig, $window, AuthService, UserService, $state) {
    var token = $state.params.token;
    var ctrl = this;
    ctrl.errorsList = [];
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
        });
    }

    function linkOrganization() {
        var query = {
            "client_secret": $scope.client_secret,
            "client_id":  $scope.client_id,
            "organization_id": $scope.organization_id,
            "return_uri": UrlService.urlWithoutQuery()
        };

        $window.location.href = AppConfig.oauthUrl + "oauth2/salesforce/link-org/?" + UrlService.makeQuery(query);
    }
}



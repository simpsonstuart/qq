angular.module('QQ')
    .controller('LinkOrganizationController', LinkOrganizationController);

function LinkOrganizationController($scope, AppConfig, $window) {
    var ctrl = this;
    ctrl.linkOrganization = linkOrganization;
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



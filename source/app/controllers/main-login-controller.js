angular.module('QQ')
    .controller('MainLoginController', MainLoginController);

function MainLoginController($stateParams, $scope, AppConfig, $window) {
    var ctrl = this;
    ctrl.getOrganization = GetOrganization;
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

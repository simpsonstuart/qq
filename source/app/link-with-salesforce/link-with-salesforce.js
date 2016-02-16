(function () {
    'use strict';
    angular.module('app.link-with-salesforce')
        .controller('LinkWithSalesforce', LinkWithSalesforce);

    function LinkWithSalesforce($scope, $state, UrlService, $window, AppConfig, AuthService) {
        var ctrl = this;
        ctrl.salesforceLogin = salesforceLogin;
        var linked = $state.params.linked;
        if (linked == 'true') {
            $state.go('deal-import');
        }

        function salesforceLogin() {
            var query = {
                "return_uri": UrlService.urlWithoutQuery(),
                "token": AuthService.token()
            };

            $window.location.href = AppConfig.oauthUrl + "oauth2/salesforce/login/?" + UrlService.makeQuery(query);

        }

    }

})();

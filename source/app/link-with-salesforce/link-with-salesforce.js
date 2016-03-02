(function () {
    'use strict';
    angular.module('app.link-with-salesforce')
        .controller('LinkWithSalesforce', LinkWithSalesforce);
    LinkWithSalesforce.$inject = ['$state', 'UrlService', '$window', 'AppConfig', 'AuthService'];

    function LinkWithSalesforce($state, UrlService, $window, AppConfig, AuthService) {
        var ctrl = this;
        ctrl.salesforceLogin = salesforceLogin;
        var linked = $state.params.linked;
        checkLinkedStatus();
        if (linked == 'true') {
            localStorage.setItem('linkedWithSalesforce', 'true');
            $window.close();

        }

        function checkLinkedStatus() {

                if (localStorage.getItem('linkedWithSalesforce')) {
                    localStorage.removeItem('linkedWithSalesforce');
                    $state.go('deal-import');
                } else {
                    setTimeout(checkLinkedStatus, 50);
                }


        }

        function salesforceLogin() {

            if(AppConfig.platform === 'ios') {
                var query = {
                    "token": AuthService.token()
                };

                var loginPopup  = cordova.InAppBrowser.open(AppConfig.oauthUrl + "oauth2/salesforce/login/?" + UrlService.makeQuery(query), '_blank', 'location=yes');
                loginPopup.addEventListener('exit', function(event) { $state.go('deal-import'); });
            } else {
                var query = {
                    "return_uri": UrlService.urlWithoutQuery(),
                    "token": AuthService.token()
                };

                var loginPopup = window.open(AppConfig.oauthUrl + "oauth2/salesforce/login/?" + UrlService.makeQuery(query), 'newwindow', 'width=600, height=550');
            }

        }
    }

})();

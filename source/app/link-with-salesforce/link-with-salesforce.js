(function () {
    'use strict';
    angular.module('app.link-with-salesforce')
        .controller('LinkWithSalesforce', LinkWithSalesforce);
    LinkWithSalesforce.$inject = ['$state', 'UrlService', '$window', 'AppConfig', 'AuthService', 'UserService'];

    function LinkWithSalesforce($state, UrlService, $window, AppConfig, AuthService, UserService) {
        var ctrl = this;
        ctrl.salesforceLogin = salesforceLogin;
        var linked = $state.params.linked;

        checkLinkedStatus();
        if (linked == 'true') {
            localStorage.setItem('linkedWithSalesforce', 'true');
            $window.close();

            UserService.profile('current').then(function (data) {
                AuthService.createTokenExpirationTime();
                AuthService.setUser(data);
            }).then(function () {
                $state.go('deal-import');
            });

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
            if(AppConfig.platform === 'ios' || AppConfig.platform === 'android') {
                var query = {
                    "token": AuthService.token()
                };

                var loginPopup  = cordova.InAppBrowser.open(AppConfig.oauthUrl + "oauth2/salesforce/login/?" + UrlService.makeQuery(query), '_blank', 'location=yes');

                loginPopup.addEventListener('loaderror', function(event) {
                    console.log('running loaderror');
                    console.log(event)
                });

                loginPopup.addEventListener('loadstop', function(event) {
                    console.log('running loadstop');
                    if (event.url.match("oauth/success")) {
                        loginPopup.close();
                        $state.go('deal-import');
                    }
                });
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

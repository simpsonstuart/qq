(function () {
    'use strict';
    angular.module('app.reset-password').config(config);

    function config($stateProvider) {
        $stateProvider.state('reset-password', {
            url: '/reset-password?token',
            restricted: false,
            data: {
                bodyClasses: 'login grey',
                headerClasses: 'logo-nav',
                footerClasses: 'nav',
                pageTitle:     'Traqq'
            },
            views: {
                'header': {
                    templateUrl: 'views/layouts/logo-nav.html',
                    controller: 'LogoNavHeaderController',
                    controllerAs: 'ctrl'
                },
                'container': {
                    templateUrl: 'views/reset-password/reset-password.html',
                    controller: 'ResetPassword',
                    controllerAs: 'ctrl'
                }
            }
        });
    }

})();

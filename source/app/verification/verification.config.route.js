(function () {
    'use strict';
    angular.module('app.verification').config(config);

    function config($stateProvider) {
        $stateProvider.state('verification', {
            url: '/verification?token',
            restricted: true,
            data: {
                bodyClasses: 'login',
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
                    templateUrl: 'views/verification/verification.html',
                    controller: 'Verification',
                    controllerAs: 'ctrl'
                }
            }
        });
    }

})();

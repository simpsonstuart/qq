(function () {
    'use strict';
    angular.module('app.get-started').config(config);

    function config($stateProvider) {
        $stateProvider.state('get-started', {
            url: '/get-started?token',
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
                    templateUrl: 'views/get-started/get-started.html',
                    controller: 'GetStarted',
                    controllerAs: 'ctrl'
                }
            }
        });
    }

})();

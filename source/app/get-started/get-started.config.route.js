(function () {
    'use strict';
    angular.module('app.registration').config(config);

    function config($stateProvider) {
        $stateProvider.state('get-started', {
            url: '/get-started',
            restricted: false,
            data: {
                bodyClasses: 'login',
                headerClasses: 'logo-nav',
                footerClasses: 'nav',
                pageTitle:     'Traqq'
            },
            views: {
                'header': {
                    templateUrl: 'views/layouts/logo-nav.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container': {
                    templateUrl: 'views/get-started/get-started.html',
                    controller: 'Registration',
                    controllerAs: 'ctrl'
                }
            }
        });
    }

})();

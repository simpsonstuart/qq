(function () {
    'use strict';
    angular.module('app.set-fiscal-year').config(config);

    function config($stateProvider) {
        $stateProvider.state('set-fiscal-year', {
            url: '/set-fiscal-year',
            restricted: true,
            data: {
                bodyClasses: '',
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
                    templateUrl: 'views/set-fiscal-year/set-fiscal-year.html',
                    controller: 'SetFiscalYear',
                    controllerAs: 'ctrl'
                }
            }
        });
    }

})();

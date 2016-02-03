(function () {
    'use strict';
    angular.module('app.dashboard').config(config);

    function config($stateProvider) {
        $stateProvider.state('dashboard', {
            url: '/',
            restricted: true,
            data:     {
                bodyClasses:   '',
                headerClasses: '',
                footerClasses: 'nav',
                pageTitle:     'Traqq'
            },
            views: {
                'header': {
                    templateUrl: 'views/layouts/default-header.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container': {
                    templateUrl: 'views/dashboard/dashboard.html',
                    controller: 'Dashboard',
                    controllerAs: 'ctrl'
                },
                'footer': {
                    templateUrl: 'views/layouts/default-footer.html',
                    controller: 'FooterController',
                    controllerAs: 'ctrl'
                }
            }
        })
    }
})();

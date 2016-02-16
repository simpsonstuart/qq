(function () {
    'use strict';
    angular.module('app.reset-password').config(config);

    function config($stateProvider) {
        $stateProvider.state('reset-password', {
            url: '/reset-password',
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
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container': {
                    templateUrl: 'views/reset-password/reset-password.html',
                    controller: 'Reset-Password',
                    controllerAs: 'ctrl'
                }
            }
        });
    }

})();

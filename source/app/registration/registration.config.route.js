(function () {
    'use strict';
    angular.module('app.registration').config(config);

    function config($stateProvider) {
        $stateProvider.state('registration', {
            url: '/registration',
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
                    templateUrl: 'views/registration/registration.html',
                    controller: 'Registration',
                    controllerAs: 'ctrl'
                }
            }
        });
    }

})();

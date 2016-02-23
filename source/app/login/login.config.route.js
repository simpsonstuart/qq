(function () {
    'use strict';
    angular.module('app.login').config(config);

    function config($stateProvider) {
        $stateProvider.state('login', {
            url: '/login?token',
            restricted: false,
            params: {
                reset_success: '',
                reset_fail: ''
            },
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
                    templateUrl: 'views/login/login.html',
                    controller: 'LoginController',
                    controllerAs: 'ctrl'
                }
            }
        })
    }
})();

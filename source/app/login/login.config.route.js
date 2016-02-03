(function () {
    'use strict';
    angular.module('app.login').config(config);

    function config($stateProvider) {
        $stateProvider.state('login', {
            url: '/login?token,new_user',
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
                    templateUrl: 'views/login/login.html',
                    controller: 'LoginController',
                    controllerAs: 'ctrl'
                }
            }
        })
    }
})();

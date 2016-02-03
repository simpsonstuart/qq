(function () {
    'use strict';
    angular.module('app.login').config(config);

    function config($stateProvider) {
        $stateProvider.state('login', {
            url: '/login?token,new_user',
            restricted: false,
            data: {
                bodyClasses: 'login grey',
                headerClasses: 'logo-nav'
            },
            views: {
                'header@root': {
                    templateUrl: 'views/layouts/logo-nav.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container@root': {
                    templateUrl: 'views/login.html',
                    controller: 'LoginController',
                    controllerAs: 'ctrl'
                }
            }
        })
    }
})();

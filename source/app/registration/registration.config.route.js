(function () {
    'use strict';
    angular.module('app.registration').config(config);

    function config($stateProvider) {
        $stateProvider.state('registration', {
            url: '/registration',
            restricted: false,
            data: {
                bodyClasses: 'login grey',
                headerClasses: 'back'
            },
            views: {
                'header': {
                    templateUrl: 'views/layouts/back-header-with-nav.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container': {
                    templateUrl: 'views/registration.html',
                    controller: 'Registration',
                    controllerAs: 'ctrl'
                }
            }
        });
    }

})();

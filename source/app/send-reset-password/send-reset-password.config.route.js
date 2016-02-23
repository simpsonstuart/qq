(function () {
    'use strict';
    angular.module('app.send-reset-password').config(config);

    function config($stateProvider) {
        $stateProvider.state('send-reset-password', {
            url: '/send-reset-password',
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
                    templateUrl: 'views/send-reset-password/send-reset-password.html',
                    controller: 'SendResetPassword',
                    controllerAs: 'ctrl'
                }
            }
        });
    }

})();

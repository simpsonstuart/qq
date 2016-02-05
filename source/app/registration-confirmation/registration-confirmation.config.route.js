(function () {
    'use strict';
    angular.module('app.registration-confirmation').config(config);

    function config($stateProvider) {
        $stateProvider.state('registration-confirmation', {
            url: '/registration-confirmation',
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
                    templateUrl: 'views/registration-confirmation/registration-confirmation.html',
                    controller: 'RegistrationConfirmation',
                    controllerAs: 'ctrl'
                }
            }
        });
    }

})();

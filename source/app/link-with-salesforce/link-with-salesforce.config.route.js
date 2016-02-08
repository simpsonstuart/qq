(function () {
    'use strict';
    angular.module('app.link-with-salesforce').config(config);

    function config($stateProvider) {
        $stateProvider.state('link-with-salesforce', {
            url: '/link-with-salesforce',
            restricted: false,
            data: {
                bodyClasses: 'login',
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
                    templateUrl: 'views/link-with-salesforce/link-with-salesforce.html',
                    controller: 'LinkWithSalesforce',
                    controllerAs: 'ctrl'
                }
            }
        });
    }

})();

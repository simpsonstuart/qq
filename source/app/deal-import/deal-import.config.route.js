(function () {
    'use strict';
    angular.module('app.deal-import').config(config);

    function config($stateProvider) {
        $stateProvider.state('deal-import', {
            url: '/deals/import/',
            restricted: true,
            data: {
                headerClasses: 'back'
            },
            views: {
                'header': {
                    templateUrl: 'views/layouts/import-back-header.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container': {
                    templateUrl: 'views/deal-import.html',
                    controller: 'DealImport',
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

(function () {
    'use strict';
    angular.module('app.sync').config(config);

    function config($stateProvider) {
        $stateProvider.state('sync', {
                url: '/sync',
                restricted: true,
                data: {
                    bodyClasses: '',
                    headerClasses: 'back',
                    footerClasses: 'nav',
                    pageTitle:     'Traqq'
                },
                views: {
                    'header': {
                        templateUrl: 'views/layouts/default-header.html',
                        controller: 'DefaultHeaderController',
                        controllerAs: 'ctrl'
                    },
                    'container': {
                        templateUrl: 'views/sync/sync.html',
                        controller: 'Sync',
                        controllerAs: 'ctrl'
                    },
                    'footer': {
                        templateUrl: 'views/layouts/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                }
            }
        );
    }

})();

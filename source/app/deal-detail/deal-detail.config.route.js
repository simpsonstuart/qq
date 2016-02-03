(function () {
    'use strict';
    angular.module('app.dashboard').config(config);

    function config($stateProvider) {
        $stateProvider        .state('deal-list.detail', {
            url: '/:deal_id',
            restricted: true,
            params: {
                deal_id: 'Deal ID'
            },
            data: {
                headerClasses: 'back',
                footerClasses: 'nav',
                pageTitle:     'Traqq'
            },
            views: {
                'header': {
                    templateUrl: 'views/layouts/back-header-with-nav.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container': {
                    templateUrl: 'views/deal-detail/deal-detail.html',
                    controller: 'DealDetail',
                    controllerAs: 'ctrl'
                },
                'footer': {
                    templateUrl: 'views/layouts/default-footer.html',
                    controller: 'FooterController'
                }
            }
        })
    }

})();

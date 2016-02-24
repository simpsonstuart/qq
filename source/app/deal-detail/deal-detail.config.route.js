(function () {
    'use strict';
    angular.module('app.deal-list').config(config);

    function config($stateProvider) {
        $stateProvider.state('deal-detail', {
            url: '/deals/:deal_id',
            restricted: true,
            params: {
                deal_id: 'Deal ID'
            },
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
                    templateUrl: 'views/deal-detail/deal-detail.html',
                    controller: 'DealDetail',
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

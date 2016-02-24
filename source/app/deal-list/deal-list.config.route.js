(function () {
    'use strict';
    angular.module('app.deal-list').config(config);

    function config($stateProvider) {
        $stateProvider.state('deal-list', {
            url: '/deal-list',
            restricted: true,
            data: {
                bodyClasses: '',
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
                    templateUrl: 'views/deal-list/deal-list.html',
                    controller: 'DealList',
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

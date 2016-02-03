(function () {
    'use strict';
    angular.module('app.deal-list').config(config);

    function config($stateProvider) {
        $stateProvider.state('deal-list', {
            url: '/deals',
            restricted: true,
            views: {
                'header': {
                    templateUrl: 'views/layouts/default-header.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container': {
                    templateUrl: 'views/deal-list.html',
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

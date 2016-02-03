(function () {
    'use strict';
    angular.module('app.deal-list').config(config);

    function config($stateProvider) {
        $stateProvider.state('deal-list', {
            url: '/deals',
            restricted: true,
            views: {
                'header@root': {
                    templateUrl: 'views/layouts/default-header.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container@root': {
                    templateUrl: 'views/deal-list.html',
                    controller: 'DealList',
                    controllerAs: 'ctrl'
                },
                'footer@root': {
                    templateUrl: 'views/layouts/default-footer.html',
                    controller: 'FooterController',
                    controllerAs: 'ctrl'
                }
            }
        })
    }
})();

(function () {
    'use strict';
    angular.module('app.deal-detail-edit').config(config);

    function config($stateProvider) {
        $stateProvider.state('deal-detail-edit', {
                url: '/deal-detail-edit',
                restricted: true,
                data: {
                    bodyClasses: 'grey',
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
                        templateUrl: 'views/deal-detail-edit/deal-detail-edit.html',
                        controller: 'DealDetailEdit',
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

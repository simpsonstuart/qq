(function () {
    'use strict';
    angular.module('app.edit.amount').config(config);

    function config($stateProvider) {
        $stateProvider.state('edit-amount', {
                url: '/edit-amount/:deal_id?amount',
                restricted: true,
            params: {
                deal_id: 'Deal ID',
                amount: 'Deal Amount'
            },
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
                        templateUrl: 'views/edit-amount/edit-amount.html',
                        controller: 'EditAmount',
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

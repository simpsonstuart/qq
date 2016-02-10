(function () {
    'use strict';
    angular.module('app.edit.account').config(config);

    function config($stateProvider) {
        $stateProvider.state('edit-account', {
                url: '/edit-account',
                restricted: true,
            params: {
                deal_id: 'Deal ID'
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
                        templateUrl: 'views/edit-account/edit-account.html',
                        controller: 'EditAccount',
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

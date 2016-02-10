(function () {
    'use strict';
    angular.module('app.edit-close-date').config(config);

    function config($stateProvider) {
        $stateProvider.state('edit-close-date', {
                url: '/edit-close-date',
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
                        templateUrl: 'views/edit-close-date/edit-close-date.html',
                        controller: 'EditCloseDate',
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

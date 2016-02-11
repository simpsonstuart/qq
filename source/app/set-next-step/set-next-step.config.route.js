(function () {
    'use strict';
    angular.module('app.set-next-step').config(config);

    function config($stateProvider) {
        $stateProvider.state('set-next-step', {
                url: '/set-next-step',
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
                        templateUrl: 'views/set-next-step/set-next-step.html',
                        controller: 'SetNextStep',
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
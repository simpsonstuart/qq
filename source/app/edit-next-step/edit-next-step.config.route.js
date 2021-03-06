(function () {
    'use strict';
    angular.module('app.edit-next-step').config(config);

    function config($stateProvider) {
        $stateProvider.state('edit-next-step', {
                url: '/deals/:deal_id/edit-next-step',
                restricted: true,
                params: {
                    deal_id: 'Deal ID',
                    next_step: '',
                    from_page: ''
                },
                data: {
                    bodyClasses: 'grey',
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
                        templateUrl: 'views/edit-next-step/edit-next-step.html',
                        controller: 'EditNextStep',
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

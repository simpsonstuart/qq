(function () {
    'use strict';
    angular.module('app.next-steps').config(config);

    function config($stateProvider) {
        $stateProvider.state('next-steps', {
            url: '/next-steps',
            restricted: true,
            data: {
                footerClasses: 'nav',
                pageTitle:     'Traqq'
            },
            views: {
                'header': {
                    templateUrl: 'views/layouts/default-header.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container': {
                    templateUrl: 'views/next-steps/coming-soon.html',
                    controller: 'NextSteps',
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

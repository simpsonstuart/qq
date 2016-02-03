(function () {
    'use strict';
    angular.module('app.next-steps').config(config);

    function config($stateProvider) {
        $stateProvider.state('next-steps', {
            url: '/next-steps',
            restricted: true,
            views: {
                'header@root': {
                    templateUrl: 'views/layouts/default-header.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container@root': {
                    templateUrl: 'views/coming-soon.html',
                    controller: 'NextSteps',
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

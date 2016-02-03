(function () {
    'use strict';
    angular.module('app.settings').config(config);

    function config($stateProvider) {
        $stateProvider.state('settings', {
                url: '/settings',
                restricted: true,
                data: {
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'views/layouts/back-header-with-nav.html',
                        controller: 'HeaderController',
                        controllerAs: 'ctrl'
                    },
                    'container@root': {
                        templateUrl: 'views/settings.html',
                        controller: 'Settings',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'views/layouts/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                }
            }
        );
    }

})();

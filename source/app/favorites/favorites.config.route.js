(function () {
    'use strict';
    angular.module('app.favorites').config(config);

    function config($stateProvider) {
        $stateProvider.state('favorites', {
                url: '/favorites',
                restricted: true,
                data: {
                    bodyClasses: '',
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
                        templateUrl: 'views/favorites/favorites.html',
                        controller: 'Favorites',
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

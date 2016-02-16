(function () {
    'use strict';

    angular.module('app', [
        //Angular

        //Third party
        'ui.router',
        'satellizer',
        'angular-cache',

        //Internal
        'app.common',
        'app.dashboard',
        'app.deal-detail',
        'app.deal-import',
        'app.deal-list',
        'app.login',
        'app.next-steps',
        'app.registration',
        'app.settings',
        'app.sync',
        'app.registration-confirmation',
        'app.get-started',
        'app.link-with-salesforce',
        'app.favorites',
        'app.edit-next-step',
        'app.edit-close-date',
        'app.edit.amount',
        'app.deal-detail-edit',
        'app.reset-password'

    ]);

    angular.module('app').constant('AppConfig', {
        'apiUri':   "app.API_URI",
        'platform': "app.PLATFORM", // web, android, ios
        'environment': "app.ENVIRONMENT", // e.g. dev or prod
        'oauthUrl': "app.OAUTH_URI"
    });

    angular.module('app').run(run);
    angular.module('app').config(config);


    function run($http, CacheFactory, $rootScope, $state, AuthService, $stateParams) {

        $http.defaults.cache = CacheFactory('defaultCache', {
            maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes
            cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
            deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
        });

        $rootScope.$on('$stateChangeStart', stateChangeStart);

        function stateChangeStart(event, next) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            if (next.restricted && (!AuthService.loggedIn())) {

                event.preventDefault();
                $state.go('login');
            }
            if (next.name == 'login' && AuthService.loggedIn()) {
                event.preventDefault();
                $state.go('dashboard');
            }

            AuthService.refreshToken();
        }
    }

    function config(AppConfig, $urlRouterProvider, $httpProvider, $locationProvider, $authProvider) {

        // Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        $authProvider.loginUrl = AppConfig.apiUri + 'login';

        $httpProvider.interceptors.push("HttpErrorInterceptor");
        $locationProvider.html5Mode(false);
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/login');
    }
})();






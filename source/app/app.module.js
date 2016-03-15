(function () {
    'use strict';

    angular.module('app', [
        //Angular

        //Third party
        'ui.router',
        'satellizer',
        'ngIOS9UIWebViewPatch',
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
        'app.verification',
        'app.link-with-salesforce',
        'app.favorites',
        'app.edit-next-step',
        'app.edit-close-date',
        'app.edit.amount',
        'app.deal-detail-edit',
        'app.reset-password',
        'app.send-reset-password',
        'app.hamburger-menu',
        'app.set-fiscal-year'

    ]);

    angular.module('app').constant('AppConfig', {
        'apiUri':   "app.API_URI",
        'platform': "app.PLATFORM", // web, android, ios
        'environment': "app.ENVIRONMENT", // e.g. dev or prod
        'oauthUrl': "app.OAUTH_URI"
    });

    angular.module('app').run(run);
    angular.module('app').config(config);
    run.$inject = ['$http', 'CacheFactory', '$rootScope', '$state', 'AuthService', '$stateParams'];


    function run($http, CacheFactory, $rootScope, $state, AuthService, $stateParams) {

        $http.defaults.cache = CacheFactory('defaultCache', {
            maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes
            cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
            deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
        });

        $rootScope.$on('$stateChangeStart', stateChangeStart);
////////////
        function stateChangeStart(event, next) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            AuthService.refreshToken();

            if (userIsNotLoggedIn()) {
                event.preventDefault();
                $state.go('login');
            }

            if(userIsNotVerified()){
                event.preventDefault();
                $state.go('get-started');
            }

            if(userIsVerifiedAndAttemptingToGetToGetStartedPage()){
                event.preventDefault();
                $state.go('dashboard');
            }

            if(userIsNotLinkedWithSalesforce()){
                event.preventDefault();
                $state.go('link-with-salesforce');
            }

            if (userIsTryingToGetToLoginWhileLoggedIn()) {
                event.preventDefault();
                $state.go('dashboard');

            }

            function userIsNotLoggedIn() {
                return next.restricted && (!AuthService.loggedIn());
            }

            function userIsNotVerified() {
                return !(next.name == 'get-started') && next.restricted && AuthService.loggedIn() && AuthService.notVerified();
            }

            function userIsNotLinkedWithSalesforce() {
                return !(next.name == 'get-started') && !(next.name == 'link-with-salesforce') && next.restricted && AuthService.loggedIn() && AuthService.notLinkedWithSalesforce();
            }

            function userIsTryingToGetToLoginWhileLoggedIn() {
                return next.name == 'login' && AuthService.loggedIn();
            }

            function userIsVerifiedAndAttemptingToGetToGetStartedPage() {
                return (next.name == 'get-started') && AuthService.loggedIn() && AuthService.authenticatedUser().verified;
            }
        }

    }

    config.$inject = ['AppConfig', '$urlRouterProvider', '$httpProvider', '$locationProvider', '$authProvider'];
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






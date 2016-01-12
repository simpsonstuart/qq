angular.module('QQ', [
        'ui.router',
        'satellizer',
        'ngIOS9UIWebViewPatch',
        'angular-cache'
])
    .constant('ApiConfig', {
        'url': 'http://quickquestions.pixelandline.net/api/'
    })

    .run(function ($http, CacheFactory, $rootScope, $location, $state, AuthService, $stateParams) {

        $http.defaults.cache = CacheFactory('defaultCache', {
            maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes
            cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
            deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
        });

        $rootScope.$on('$stateChangeStart', function (event, next) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            if (next.restricted && (!AuthService.loggedIn())) {
                event.preventDefault();
                $state.go('root.login');
            }
            if (next.name == 'root.login' && AuthService.loggedIn()) {
                event.preventDefault();
                $state.go('root.feed');
            }

            AuthService.refreshToken();
        });
    })

    .config(function ($urlRouterProvider, $stateProvider, $httpProvider, $locationProvider, $authProvider) {

    // Satellizer configuration that specifies which API
    // route the JWT should be retrieved from
    $authProvider.loginUrl = 'http://quickquestions.pixelandline.net/api/login';

        $stateProvider
            .state('root', {
                url: '',
                abstract: true,
                data: {
                    bodyClasses: '',
                    headerClasses: '',
                    footerClasses: 'nav',
                    pageTitle: 'QQ'
                },
                views: {
                    '': {
                        templateUrl: 'includes/templates/root.html'
                    },
                }
            })
            .state('root.answer-question', {
                url: '/deals/:deal_id/answer-question/',
                restricted: true,
                data: {
                    headerClasses: 'back',
                    footerClasses: 'prev-next clearfix'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/answer.html',
                        controller: 'AnswerController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/footer-pending.html',
                        controller: 'AnswerController'
                    }
                },
                params: {
                    deal_id: 'Deal ID'
                }
            })
            .state('root.deals.detail', {
                url: '/:deal_id',
                restricted: true,
                params: {
                    deal_id: 'Deal ID'
                },
                data: {
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/deal-detail.html',
                        controller: 'DealController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController'
                    }
                }
            })
            .state('root.deals', {
                url: '/deals',
                restricted: true,
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/default-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/deal-list.html',
                        controller: 'DealsController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.deals.user', {
                url: '/owner/:user_id',
                restricted: true,
                data: {
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/deal-list.html',
                        controller: 'DealsController',
                        controllerAs: 'ctrl',
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                },
                params: {
                    user_id: 'User Id'
                }
            })
            .state('root.deal-feed', {
                url: '/deals/:deal_id/feed',
                restricted: true,
                params: {
                    deal_id: 'Deal ID'
                },
                data: {
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/deal-feed.html',
                        controller: 'DealFeedController',
                        controllerAs: 'ctrl',
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.district', {
                url: '/district',
                restricted: true,
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/default-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/district-list.html',
                        controller: 'DistrictController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.district.user', {
                url: '/:user_id',
                restricted: true,
                data: {
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/district-list.html',
                        controller: 'DistrictController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                },
                params: {
                    user_id: 'User ID'
                },
            })
            .state('root.deal-set-play', {
                url: '/deals/:deal_id/set-play',
                restricted: true,
                params: {
                    deal_id: 'Deal ID'
                },
                data: {
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/deal-set-play.html',
                        controller: 'DealSetPlayController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.deal-play-select-questions', {
                url: '/deals/:deal_id/plays/:play_id/select-questions',
                restricted: true,
                params: {
                    deal_id: 'Deal ID',
                    play_id: 'Play ID'
                },
                data: {
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/deal-play-select-questions.html',
                        controller: 'DealPlaySelectQuestionsController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.send-question-group', {
                url: '/deals/:deal_id/send-question-group/',
                restricted: true,
                data: {
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/send-question-group.html',
                        controller: 'QuestionGroupController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                },
                params: {
                    deal_id: 'Deal ID'
                },
            })
            .state('root.send-question', {
                url: '/deals/:deal_id/send-question',
                restricted: true,
                data: {
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/send-question.html',
                        controller: 'QuestionController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                },
                params: {
                    deal_id: 'Deal ID'
                },
            })
            .state('root.deal-play-questions-select-recipients', {
                url: '/deals/:deal_id/plays/:play_id/questions/recipients',
                restricted: true,
                params: {
                    deal_id: 'Deal ID',
                    play_id: 'Play ID'
                },
                data: {
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/deal-play-questions-select-recipients.html',
                        controller: 'DealPlayQuestionsSelectRecipientsController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.ask-deal', {
                url: '/ask-deal',
                restricted: true,
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/default-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/ask-deal.html',
                        controller: 'TestController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.ask-questions', {
                url: '/ask-questions',
                restricted: true,
                data: {
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/ask-questions.html',
                        controller: 'TestController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.ask-play-questions', {
                url: '/ask-questions/plays',
                restricted: true,
                data: {
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/ask-play-questions.html',
                        controller: 'TestController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.ask-reps', {
                url: '/ask-reps',
                restricted: true,
                data: {
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/ask-reps.html',
                        controller: 'MainController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.coming-soon', {
                url: '/coming-soon',
                restricted: true,
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/default-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/coming-soon.html',
                        controller: 'TestController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.import-deals', {
                url: '/deals/import/',
                restricted: true,
                data: {
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/import-back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/import-deals.html',
                        controller: 'ImportDealsController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.feed', {
                url: '/',
                restricted: true,
                data: {
                    pageTitle: 'QQ Feed'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/default-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/feed.html',
                        controller: 'FeedController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.import-users', {
                url: '/users/import/',
                restricted: true,
                data: {
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/import-back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/import-users.html',
                        controller: 'ImportUsersController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.login', {
                url: '/login',
                restricted: false,
                data: {
                    bodyClasses: 'login grey',
                    headerClasses: 'logo-nav'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/logo-nav.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/login.html',
                        controller: 'LoginController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.login-salesforce', {
                url: '/login/salesforce',
                restricted: false,
                data: {
                    bodyClasses: 'login grey',
                    headerClasses: 'logo-nav'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/logo-nav.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/login-salesforce.html',
                        controller: 'LoginSalesforceController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.profile', {
                url: '/profile',
                restricted: true,
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/default-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/profile.html',
                        controller: 'ProfileController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.profile.user', {
                url: '/:user_id',
                restricted: true,
                data: {
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/profile.html',
                        controller: 'ProfileController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                },
                params: {
                    user_id: 'User ID'
                }
            })
            .state('root.registration', {
                url: '/registration',
                restricted: false,
                data: {
                    bodyClasses: 'login grey',
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/registration.html',
                        controller: 'RegistrationController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('root.settings', {
                url: '/settings',
                restricted: true,
                data: {
                    headerClasses: 'back'
                },
                views: {
                    'header@root': {
                        templateUrl: 'includes/templates/back-header.html',
                        controller: 'HeaderController'
                    },
                    'container@root': {
                        templateUrl: 'includes/pages/settings.html',
                        controller: 'SettingsController',
                        controllerAs: 'ctrl'
                    },
                    'footer@root': {
                        templateUrl: 'includes/templates/default-footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl'
                    }
                }
            })
        ;

    $httpProvider.interceptors.push("HttpErrorInterceptor");

    //Cordova will not work with html5mode. Temporarily disabling until we can find a new solution
    $locationProvider.html5Mode(false);

        // setup http middleware

        // default state
        $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/login');
    });




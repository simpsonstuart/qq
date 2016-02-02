angular.module('QQ', [
        'ui.router',
        'satellizer',
        'ngIOS9UIWebViewPatch',
        'angular-cache'
]);

angular.module('QQ').constant('AppConfig', {
    'apiUri': "QQ.API_URI",
    'platform': "QQ.PLATFORM", // web, android, ios
    'environment': "QQ.ENVIRONMENT", // e.g. dev or prod
    'oauthUrl': "QQ.OAUTH_URI",
    });

    angular.module('QQ').run(QQRun);

    angular.module('QQ').config(QQConfig);

function QQRun($http, CacheFactory, $rootScope, $location, $state, AuthService, $stateParams) {

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
            $state.go('root.login');
        }
        if (next.name == 'root.login' && AuthService.loggedIn()) {
            event.preventDefault();
            $state.go('root.profile');
        }

        AuthService.refreshToken();
    }
}

function QQConfig(AppConfig, $urlRouterProvider, $stateProvider, $httpProvider, $locationProvider, $authProvider) {

    // Satellizer configuration that specifies which API
    // route the JWT should be retrieved from
    $authProvider.loginUrl = AppConfig.apiUri + 'login';

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
                }
            }
        })
        .state('root.answer-question', {
            url: '/deals/:deal_id/answer-question/',
            restricted: true,
            params: {
                deal_id: 'Deal ID'
            },
            data: {
                headerClasses: 'back',
                footerClasses: 'prev-next clearfix'
            },
            views: {
                'header@root': {
                    templateUrl: 'includes/templates/back-header.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
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
                    templateUrl: 'includes/templates/back-header-with-nav.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container@root': {
                    templateUrl: 'includes/pages/deal-detail.html',
                    controller: 'DealDetailController',
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
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
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
        .state('root.deals.feed', {
            url: '/:deal_id/feed',
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
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
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
        .state('root.deals.play', {
            url: '/:deal_id/plays/:play_id',
            restricted: true,
            params: {
                deal_id: 'play_id',
                play_id: 'play_id'
            },
            data: {
                headerClasses: 'back'
            },
            views: {
                'header@root': {
                    templateUrl: 'includes/templates/back-header.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container@root': {
                    templateUrl: 'includes/pages/play-feed.html',
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
                    templateUrl: 'includes/templates/back-header-with-nav.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
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
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
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
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
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
            }
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
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
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
            }
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
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
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
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container@root': {
                    templateUrl: 'includes/pages/ask-deal.html',
                    controller: 'DealQuestionController',
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
            params: {
                deal_id: "Deal ID"
            },
            data: {
                headerClasses: 'back'
            },
            views: {
                'header@root': {
                    templateUrl: 'includes/templates/back-header-with-nav.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container@root': {
                    templateUrl: 'includes/pages/ask-questions.html',
                    controller: 'QuestionController',
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
            params: {
                deal_id: "Deal ID"
            },
            data: {
                headerClasses: 'back'
            },
            views: {
                'header@root': {
                    templateUrl: 'includes/templates/back-header-with-nav.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container@root': {
                    templateUrl: 'includes/pages/ask-play-questions.html',
                    controller: 'askQuestionPlaysController',
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
            params: {
                deal_id: "Deal ID"
            },
            data: {
                headerClasses: 'back'
            },
            views: {
                'header@root': {
                    templateUrl: 'includes/templates/back-header-with-nav.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container@root': {
                    templateUrl: 'includes/pages/ask-reps.html',
                    controller: 'QuestionControllerReps',
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
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
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
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
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
            url: '/feed',
            restricted: true,
            data: {
                pageTitle: 'QQ Feed'
            },
            views: {
                'header@root': {
                    templateUrl: 'includes/templates/default-header.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
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
        .state('root.login', {
            url: '/login?token,new_user',
            restricted: false,
            data: {
                bodyClasses: 'login grey',
                headerClasses: 'logo-nav'
            },
            views: {
                'header@root': {
                    templateUrl: 'includes/templates/logo-nav.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container@root': {
                    templateUrl: 'includes/pages/login.html',
                    controller: 'LoginController',
                    controllerAs: 'ctrl'
                }
            }
        })
        .state('root.login-salesforce', {
            url: '/login/salesforce?token,errors',
            restricted: false,
            data: {
                bodyClasses: 'login grey',
                headerClasses: 'logo-nav'
            },
            views: {
                'header@root': {
                    templateUrl: 'includes/templates/logo-nav.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container@root': {
                    templateUrl: 'includes/pages/salesforce-login.html',
                    controller: 'SalesforceLoginController',
                    controllerAs: 'ctrl'
                }
            }
        })
        .state('root.profile', {
            url: '/',
            restricted: true,
            views: {
                'header@root': {
                    templateUrl: 'includes/templates/default-header.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
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

        .state('root.registration', {
            url: '/registration',
            restricted: false,
            data: {
                bodyClasses: 'login grey',
                headerClasses: 'back'
            },
            views: {
                'header@root': {
                    templateUrl: 'includes/templates/back-header-with-nav.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
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
                    templateUrl: 'includes/templates/back-header-with-nav.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
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
        .state('root.link-organization', {
            url: '/link-organization?token,errors',
            restricted: false,
            data: {
                bodyClasses: 'login grey',
                headerClasses: 'back'
            },
            views: {
                'header@root': {
                    templateUrl: 'includes/templates/back-header.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                'container@root': {
                    templateUrl: 'includes/pages/link-organization.html',
                    controller: 'LinkOrganizationController',
                    controllerAs: 'ctrl'
                }
            }
        })
    ;

    $httpProvider.interceptors.push("HttpErrorInterceptor");
    $locationProvider.html5Mode(false);
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/login');
}




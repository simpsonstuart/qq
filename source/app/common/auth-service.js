(function () {
    'use strict';

    angular.module('app.common').factory('AuthService', AuthService);

    function AuthService($auth, moment, ApiService, CacheFactory, $q) {
        var tokenLifeMinutes = 60;

        return {
            loggedIn:                  loggedIn,
            logIn:                     logIn,
            logOut:                    logOut,
            authenticatedUser:         authenticatedUser,
            createTokenExpirationTime: createTokenExpirationTime,
            refreshToken:              refreshToken,
            setUser:                   setUser
        };


        function loggedIn() {
            return $auth.isAuthenticated()
        }

        /**
         * This login works both for token based auth and username/password based auth
         *
         * @param password|token
         * @param username|null
         * @returns {*}
         */
        function logIn(password, username) {
            var args = arguments;

            if (args.length == 2) {
                var credentials = {
                    username: arguments[1],
                    password: arguments[0]
                };
                return $auth.login(credentials);
            }

            // if only a token is passed to login then we ignore the username which is args[1]
            var deferred = $q.defer();
            var token    = args[0];

            deferred.resolve((function () {
                $auth.setToken(token);
            })());

            return deferred.promise;
        }

        function setUser(userObject) {
            var user = JSON.stringify(userObject);
            return localStorage.setItem('user', user);
        }

        function logOut() {
            $auth.logout().then(function () {
                localStorage.removeItem('user');
                CacheFactory.clearAll();
            });
        }

        function authenticatedUser() {
            return JSON.parse(localStorage.getItem('user'));
        }

        function createTokenExpirationTime() {
            return localStorage.setItem('tokenExpiration', moment().add(tokenLifeMinutes, 'm').unix());
        }

        function refreshToken() {
            var newToken;

            if (localStorage.getItem('satellizer_token')) {
                var tokenExpiryEpoch = Number(localStorage.getItem('tokenExpiration'));
                var currentEpoch     = Number(moment().unix());
                var minutesLeft      = Math.floor((tokenExpiryEpoch - currentEpoch) / 60);

                if (tokenExpiryEpoch === 0) {
                    return;
                }

                if (minutesLeft < 10) {
                    newToken = ApiService.get('refresh', null, null, function (response) {
                        return response.data.token;
                    });
                    $auth.setToken(newToken);
                    createTokenExpirationTime();
                }
            } else {
                localStorage.removeItem('user');
                localStorage.removeItem('tokenExpiration');
            }
        }
    }
})();

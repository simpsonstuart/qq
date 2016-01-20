angular.module('QQ')
    .factory('AuthService', AuthService);

function AuthService($auth, moment, ApiService, CacheFactory) {
    var tokenLifeMinutes = 60;

    return {
        loggedIn: loggedIn,
        logIn: logIn,
        logOut: logOut,
        authenticatedUser: authenticatedUser,
        createTokenExpirationTime: createTokenExpirationTime,
        refreshToken: refreshToken,
        setUser: setUser
    };


    function loggedIn() {
        return $auth.isAuthenticated()
    }

    function logIn(token) {
        $auth.setToken(token);
        createTokenExpirationTime();

        return true;
    }

    function setUser(user) {
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
            var currentEpoch = Number(moment().unix());
            var minutesLeft = Math.floor((tokenExpiryEpoch - currentEpoch) / 60);

            if (tokenExpiryEpoch === 0) {
                return;
            }

            if (minutesLeft < 10) {
                newToken = ApiService.get('refresh', null, null, function (response) { return response.data.token; });
                $auth.setToken(newToken);
                createTokenExpirationTime();
            }
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('tokenExpiration');
        }
    }
}

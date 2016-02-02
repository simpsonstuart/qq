angular.module('QQ')
    .controller('RootController', RootController);

function RootController($scope, AuthService, $state) {
    var ctrl = this;
    ctrl.logOut = logOut;

    function logOut() {
        AuthService.logOut();

        $state.go('root.login');
    }
}


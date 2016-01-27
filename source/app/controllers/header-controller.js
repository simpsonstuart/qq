angular.module('QQ')
    .controller('HeaderController', HeaderController);

function HeaderController($scope, AuthService, $state) {
    var ctrl = this;
    ctrl.logOut = logOut;
    ctrl.syncSalesforce = syncSalesforce;

    function logOut() {
        AuthService.logOut();

        $state.go('root.login');
    }

    function syncSalesforce() {
        alert("Implement me!");
    }
}

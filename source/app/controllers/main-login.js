angular.module('QQ')
    .controller('MainLoginController', MainLoginController);

function MainLoginController($rootScope, $scope, AuthService, UserService, $state) {
    var ctrl = this;
    ctrl.getOrganization = GetOrganization;
    function GetOrganization() {
        AuthService.getOrganizationURL($scope.organization)
    }
}

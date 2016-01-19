angular.module('QQ')
    .controller('createOrganizationController', createOrganizationController);

function createOrganizationController($scope, $state, organizationService) {
    var ctrl = this;
    ctrl.createOrganization = createOrganization;
    function createOrganization() {
            organizationService.createOrganization($scope.clientkey, $scope.clientSecret, $scope.OrganizationName)
    }
}



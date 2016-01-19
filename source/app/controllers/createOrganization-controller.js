angular.module('QQ')
    .controller('createOrganizationController', createOrganizationController);

function createOrganizationController($scope, $state, organizationService) {
    var ctrl = this;
    ctrl.createOrganization = createOrganization;
    function createOrganization() {
        organizationService.createOrganization(function () {
            return { 'clientkey' : $scope.clientkey, 'clientSecret' : $scope.clientSecret, 'OrganizationName' : $scope.OrganizationName }
                .then(function(){
                    $state.go('root.import-users');
                })
        });
    }
}



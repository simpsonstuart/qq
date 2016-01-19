angular.module('QQ')
    .factory('organizationService', organizationService);

function organizationService(ApiService) {

    return {
        createOrganization: createOrganization
    };

    function createOrganization(organization_data){
        return ApiService.post('createOrganization', organization_data);
    }
}

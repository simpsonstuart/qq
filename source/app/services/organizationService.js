angular.module('QQ')
    .factory('organizationService', organizationService);

function organizationService(ApiService) {

    return {
        createOrganization: createOrganization
    };

    function createOrganization(clientkey, clientSecret, OrganizationName ){
        var URLBase = "https://qq.app/oauth2/salesforce/new-org?return_uri=http://qq.app/test&organization_id=";
        var redirectURL = URLBase + OrganizationName + "&client_secret=" + clientSecret +"&client_id=" + clientkey;
        console.log(redirectURL);
        window.location = redirectURL;
    }
}

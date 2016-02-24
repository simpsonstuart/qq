(function () {
    'use strict';

    angular.module('app.common').directive('formerrors', FormErrorsDirective);

    function FormErrorsDirective() {
        return {
            restrict: 'E',
            transclude : false,
            template: '<small class="error-list" ng-repeat="error in errors" >{{ error }}</small>',
            scope: {
                errors: "="
            },
            link : function(scope, element, attrs) {
            }
        };
    }

})();

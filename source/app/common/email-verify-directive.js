(function () {
    'use strict';

    angular.module('app.common').directive('emailVerify', pwCheck);

    function pwCheck() {
        var INTEGER_REGEXP = new RegExp('^[a-z0-9]+(\.[_a-z0-9]+)*@@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,50})$', 'i');
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (INTEGER_REGEXP.test(viewValue)) {
                        // it is valid
                        ctrl.$setValidity('emailVerify', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('emailVerify', false);
                        return undefined;
                    }
                });
            }
        };
    }

})();
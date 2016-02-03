(function () {
    'use strict';

    angular.module('app.common').directive('backButton', backButton);

    function backButton($window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }

})();



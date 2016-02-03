(function () {
    'use strict';
    angular.module('app.common').factory('numeral', numeral);

    function numeral($window) {
        return $window.numeral;
    }
})();

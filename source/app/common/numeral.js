(function () {
    'use strict';
    angular.module('app.common').factory('numeral', numeral);
    numeral.$inject = ['$window'];

    function numeral($window) {
        return $window.numeral;
    }
})();

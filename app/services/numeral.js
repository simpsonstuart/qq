angular.module('QQ').factory('numeral', numeral);

function numeral($window) {
    return $window.numeral;
}

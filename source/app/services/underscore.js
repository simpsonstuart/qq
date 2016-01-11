angular.module('QQ').factory('_', underscore);

function underscore($window) {
    return $window._; // assumes underscore has already been loaded on the page
}

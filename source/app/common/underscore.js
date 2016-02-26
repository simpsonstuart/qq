(function () {
    'use strict';
    angular.module('app.common').factory('_', underscore);
    _.$inject = ['$window'];

    function underscore($window) {
        return $window._; // assumes underscore has already been loaded on the page
    }
})();

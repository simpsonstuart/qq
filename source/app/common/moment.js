(function () {
    'use strict';
    angular.module('app.common').factory('moment', moment);
    moment.$inject = ['$window'];

    function moment($window) {
        return $window.moment; // assumes underscore has already been loaded on the page
    }
})();

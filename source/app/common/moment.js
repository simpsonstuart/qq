(function () {
    'use strict';
    angular.module('app.common').factory('moment', moment);

    function moment($window) {
        return $window.moment; // assumes underscore has already been loaded on the page
    }
})();

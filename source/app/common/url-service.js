(function () {
    'use strict';
    angular.module('app.common')
        .factory('UrlService', UrlService);

    function UrlService($location) {
        return {
            makeQuery: makeQuery,
            urlWithoutPath: urlWithoutPath,
            urlWithoutQuery: urlWithoutQuery
        };

        /**
         * query = { "test": "foobar", "test2: "fooo"};
         * is transformed to "test=foobar&test2=fooo"
         *
         * @param {array} data
         * @returns {string}
         */
        function makeQuery(data) {
            return Object.keys(data).map(function(key) {
                return [key, data[key]].map(encodeURIComponent).join("=");
            }).join("&");
        }

        /**
         * "http://localhost:3000/#/link-organization?myquery=test"
         * is returned as "http://localhost:3000/#"
         *
         * @returns {string}
         */
        function urlWithoutPath() {
            return $location.absUrl().replace($location.url(), '');
        }

        /**
         * "http://localhost:3000/#/link-organization?myquery=test"
         * is returned as: "http://localhost:3000/#/link-organization"
         * @returns {string}
         */
        function urlWithoutQuery() {
            return urlWithoutPath() + $location.path();
        }
    }
})();

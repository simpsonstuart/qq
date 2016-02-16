(function () {
    'use strict';
    angular.module('app')
        .factory('DateAndTimeService', DateAndTimeService);

    function DateAndTimeService(moment) {
        return {
            formatDate: formatDate,
            currentQuarter: currentQuarter,
            daysTill: daysTill,
            dateFromFormat: dateFromFormat,
            dateToFormat: dateToFormat
        };

        /**
         * @param {string} date
         * @returns {moment}
         */
        function formatDate(date) {
            return moment(date);
        }

        /**
         * Converts a date from a string to a moment object
         *
         * @param {string} date
         * @param {string} format
         * @returns {moment}
         */
        function dateFromFormat(date, format) {
            return moment(date, format);
        }

        //function utcToFormat

        /**
         * converts a date string from one format to another
         *
         * @param {string} date
         * @param {string} toFormat
         * @param {string} fromFormat
         * @returns {string}
         */
        function dateToFormat(date, toFormat, fromFormat) {
            if (fromFormat != undefined) {
                return moment(date, fromFormat).format(toFormat);
            }

            return moment(date).format(toFormat);
        }

        /**
         * @returns {int}
         */
        function currentQuarter() {
            return moment().quarter();
        }

        /**
         * @param {string} date
         * @returns {int}
         */
        function daysTill(date) {
            return moment().to(date);
        }
    }

})();

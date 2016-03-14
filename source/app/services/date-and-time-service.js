(function () {
    'use strict';
    angular.module('app')
        .factory('DateAndTimeService', DateAndTimeService);

    function DateAndTimeService(moment) {
        return {
            formatDate: formatDate,
            formatQuarter: formatQuarter,
            daysTill: daysTill,
            dateFromFormat: dateFromFormat,
            dateToFormat: dateToFormat,
            dateDayMonth: dateDayMonth,
            monthNumber: monthNumber
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
        function formatQuarter(date) {
            return moment(date).format('MMM DD');
        }

        /**
         * @param {string} date
         * @returns {int}
         */
        function daysTill(date) {
            return moment().to(date);
        }

        function dateDayMonth (date){
            return moment(date).format('DD/MM');
        }

        /**
         * Takes a three character month designator and converts it to an int
         * e.g monthNumber('July') -> 7
         *
         * @param selectedMonth
         * @returns {number}
         */
        function monthNumber(selectedMonth) {
            return moment.months().indexOf(selectedMonth) + 1;
        }
    }

})();

(function () {
    'use strict';
    angular.module('app')
        .factory('FiscalYearService', FiscalYearService);
    FiscalYearService.$inject = ['moment'];
    function FiscalYearService(moment) {
        return {
            currentFiscalQuarterDates: currentFiscalQuarterDates
        };

        /**
         * @param {moment} currentDate
         * @param {int} fiscalYearStartMonth
         * @returns {FiscalQuarter}
         */
        function currentFiscalQuarterDates(currentDate, fiscalYearStartMonth) {
            var fiscalYearStart;
            fiscalYearStartMonth = (fiscalYearStartMonth - 1);

            if (fiscalYearStartMonth <= (currentDate.month()) ) {
                fiscalYearStart = moment().month(fiscalYearStartMonth).date(1).hour(0).minute(0).second(0);
            } else {
                fiscalYearStart = moment().year(moment().year() - 1).month(fiscalYearStartMonth).date(1).hour(0).minute(0).second(0);
            }

            var firstQuarterStart = moment(fiscalYearStart);
            var secondQuarterStart = moment(firstQuarterStart).add(3, 'months');
            var firstQuarterEnd = moment(secondQuarterStart).subtract(1, 'days');
            var thirdQuarterStart = moment(secondQuarterStart).add(3, 'months');
            var secondQuarterEnd = moment(thirdQuarterStart).subtract(1, 'days');
            var fourthQuarterStart = moment(thirdQuarterStart).add(3, 'months');
            var thirdQuarterEnd = moment(fourthQuarterStart).subtract(1, 'days');
            var nextYearFirstQuarterStart = moment(fourthQuarterStart).add(3, 'months');
            var fourthQuarterEnd = moment(nextYearFirstQuarterStart).subtract(1, 'days');

            if(moment(currentDate).isBetween(firstQuarterStart, firstQuarterEnd) || moment(currentDate).isSame(firstQuarterStart)) {
                return new FiscalQuarter(firstQuarterStart, firstQuarterEnd);
            } else if (moment(currentDate).isBetween(firstQuarterEnd, secondQuarterEnd) || moment(currentDate).isSame(firstQuarterEnd)) {
                return new FiscalQuarter(secondQuarterStart, secondQuarterEnd);
            } else if(moment(currentDate).isBetween(secondQuarterEnd, thirdQuarterEnd) || moment(currentDate).isSame(secondQuarterEnd)) {
                return new FiscalQuarter(thirdQuarterStart, thirdQuarterEnd);
            } else if(moment(currentDate).isBetween(thirdQuarterEnd, fourthQuarterEnd) || moment(currentDate).isSame(thirdQuarterEnd)) {
                return new FiscalQuarter(fourthQuarterStart, fourthQuarterEnd);
            }
        }

        /**
         * @typedef FiscalQuarter
         * @type Object
         * @property {moment} start The Start Date Moment Object
         * @property {moment} end The End Date Moment Object
         */
        function FiscalQuarter(start, end) {
            this.start = start;
            this.end = end;
        }
    }
})();

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
         * @param {moment} date
         * @param {int} fiscalYearStartMonth
         * @returns {FiscalQuarter}
         */
        function currentFiscalQuarterDates(date, fiscalYearStartMonth) {
            var fiscalYearStart;
            fiscalYearStartMonth = (fiscalYearStartMonth - 1);
            fiscalYearStart      = _calculateFiscalYearStart(fiscalYearStartMonth, date);

            var firstQuarterStart = moment(fiscalYearStart);
            var secondQuarterStart = moment(firstQuarterStart).add(3, 'months');
            var firstQuarterEnd = moment(secondQuarterStart).subtract(1, 'days').hour(23).minute(59).second(59);
            var thirdQuarterStart = moment(secondQuarterStart).add(3, 'months');
            var secondQuarterEnd = moment(thirdQuarterStart).subtract(1, 'days').hour(23).minute(59).second(59);
            var fourthQuarterStart = moment(thirdQuarterStart).add(3, 'months');
            var thirdQuarterEnd = moment(fourthQuarterStart).subtract(1, 'days').hour(23).minute(59).second(59);
            var nextYearFirstQuarterStart = moment(fourthQuarterStart).add(3, 'months');
            var fourthQuarterEnd = moment(nextYearFirstQuarterStart).subtract(1, 'days').hour(23).minute(59).second(59);

            if(_dateIsInFirstQuarter(date, firstQuarterStart, firstQuarterEnd)) {
                return new FiscalQuarter(firstQuarterStart, firstQuarterEnd);
            } else if (_dateIsInSecondQuarter(date, secondQuarterStart, secondQuarterEnd)) {
                return new FiscalQuarter(secondQuarterStart, secondQuarterEnd);
            } else if(_dateIsInThirdQuarter(date, thirdQuarterStart, thirdQuarterEnd)) {
                return new FiscalQuarter(thirdQuarterStart, thirdQuarterEnd);
            } else if(_dateIsInFourthQuarter(date, fourthQuarterStart, fourthQuarterEnd)) {
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

        function _calculateFiscalYearStart(fiscalYearStartMonth, currentDate) {
            if (fiscalYearStartMonth <= (currentDate.month())) {
                return moment().month(fiscalYearStartMonth).date(1).hour(0).minute(0).second(0);
            }
            return moment().year(moment().year() - 1).month(fiscalYearStartMonth).date(1).hour(0).minute(0).second(0);
        }

        function _dateIsInFirstQuarter(currentDate, firstQuarterStart, firstQuarterEnd) {
            return _dateIsBetween(currentDate, firstQuarterStart, firstQuarterEnd);
        }
        
        function _dateIsInSecondQuarter(date, secondQuarterStart, secondQuarterEnd) {
            return _dateIsBetween(date, secondQuarterStart, secondQuarterEnd);
        }

        function _dateIsInThirdQuarter(date, thirdQuarterStart, thirdQuarterEnd) {
            return _dateIsBetween(date, thirdQuarterStart, thirdQuarterEnd);
        }

        function _dateIsInFourthQuarter(date, fourthQuarterStart, fourthQuarterEnd) {
            return _dateIsBetween(date, fourthQuarterStart, fourthQuarterEnd);
        }
        
        function _dateIsBetween(date, quarterStart, quarterEnd) {
            return moment(date).isSameOrAfter(quarterStart) && moment(date).isSameOrBefore(quarterEnd);
        }
    }
})();

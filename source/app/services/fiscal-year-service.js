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

            if (fiscalYearStartMonth <= currentDate.month() ) {
                fiscalYearStart = moment().month(ctrl.fiscalYearStartMonthNumber).date(1).hour(0).minute(0).second(0);
            } else {
                fiscalYearStart = moment().year(moment().year() - 1).month(fiscalYearStartMonth).date(1).hour(0).minute(0).second(0);
            }

            var startFirstQuarter = moment(fiscalYearStart);
            var endFirstQuarter = moment(startFirstQuarter).add(3, 'months').subtract(1, 'days');
            var endSecondQuarter = moment(endFirstQuarter).add(3, 'months').subtract(1, 'days');
            var endThirdQuarter = moment(endSecondQuarter).add(3, 'months').subtract(1, 'days');
            var endFourthQuarter = moment(endThirdQuarter).add(3, 'months').subtract(1, 'days');

            if(moment(currentDate).isBetween(startFirstQuarter, endFirstQuarter) || moment(currentDate).isSame(startFirstQuarter)) {
                return new FiscalQuarter(startFirstQuarter, endFirstQuarter);
            } else if (moment(currentDate).isBetween(endFirstQuarter, endSecondQuarter) || moment(currentDate).isSame(endFirstQuarter)) {
                return new FiscalQuarter(moment(endFirstQuarter).add(1, 'days'), endSecondQuarter);
            } else if(moment(currentDate).isBetween(endSecondQuarter, endThirdQuarter) || moment(currentDate).isSame(endSecondQuarter)) {
                return new FiscalQuarter(moment(endSecondQuarter).add(1, 'days'), endThirdQuarter);
            } else if(moment(currentDate).isBetween(endThirdQuarter, endFourthQuarter) || moment(currentDate).isSame(endThirdQuarter)) {
                return new FiscalQuarter(moment(endThirdQuarter).add(1, 'days'), endFourthQuarter);
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

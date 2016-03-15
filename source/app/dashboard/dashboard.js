(function () {
    'use strict';
    angular.module('app.dashboard')
        .controller('Dashboard', Dashboard);
    Dashboard.$inject = ['NumberService', 'DateAndTimeService', 'AuthService', 'UserService', 'moment'];

    function Dashboard(NumberService, DateAndTimeService, AuthService, UserService, moment) {
        var ctrl = this;

        ctrl.convertNumberToWord = NumberService.numberToWord;
        ctrl.formatMoney = NumberService.formatMoney;
        ctrl.dealsWithoutNextSteps = "0";
        ctrl.formatQuarter = DateAndTimeService.formatQuarter;
        ctrl.fiscalYearStartDate = 'January 1';


        _activate();


        function _activate() {

            UserService.profile('current').then(function (userObject) {
                AuthService.setUser(userObject);
                ctrl.profile = userObject;
                ctrl.allMyDeals = ctrl.profile.active_deals_amount.data.amount;
                ctrl.newDealsAmount = ctrl.profile.last_deal_import_amount.data.amount;
                ctrl.dealsNextWithoutStepsCount = ctrl.profile.deals_without_next_steps_count.data.count;
                ctrl.nextStepsCount             = ctrl.profile.next_steps_count.data.count;
                ctrl.fiscalYearStartMonthNumber = ctrl.profile.fiscal_year_start_month;
                ctrl.fiscalYearStartMonth = DateAndTimeService.monthName(ctrl.fiscalYearStartMonthNumber);
            }).then(function () {
                var currentDate = moment();
                var fiscalYearStart;

                if (ctrl.fiscalYearStartMonthNumber <= currentDate.month() ) {
                    fiscalYearStart = moment().month(ctrl.fiscalYearStartMonthNumber).date(1).hour(0).minute(0).second(0);
                } else {
                    fiscalYearStart = moment().year(moment().year() - 1).month(ctrl.fiscalYearStartMonthNumber).date(1).hour(0).minute(0).second(0);
                }

                var startFirstQuarter = moment(fiscalYearStart);
                var endFirstQuarter = moment(startFirstQuarter).add(3, 'months').subtract(1, 'days');
                var endSecondQuarter = moment(endFirstQuarter).add(3, 'months').subtract(1, 'days');
                var endThirdQuarter = moment(endSecondQuarter).add(3, 'months').subtract(1, 'days');
                var endFourthQuarter = moment(endThirdQuarter).add(3, 'months').subtract(1, 'days');

                if(moment(currentDate).isBetween(startFirstQuarter, endFirstQuarter) || moment(currentDate).isSame(startFirstQuarter)){
                    ctrl.currentQuarterStart = startFirstQuarter;
                    ctrl.currentQuarterEnd = endFirstQuarter;
                }
                if (moment(currentDate).isBetween(endFirstQuarter, endSecondQuarter) || moment(currentDate).isSame(endFirstQuarter)){
                    ctrl.currentQuarterStart = moment(endFirstQuarter).add(1, 'days');
                    ctrl.currentQuarterEnd = endSecondQuarter;
                }
                if(moment(currentDate).isBetween(endSecondQuarter, endThirdQuarter) || moment(currentDate).isSame(endSecondQuarter)){
                    ctrl.currentQuarterStart = moment(endSecondQuarter).add(1, 'days');
                    ctrl.currentQuarterEnd = endThirdQuarter;
                }
                if(moment(currentDate).isBetween(endThirdQuarter, endFourthQuarter) || moment(currentDate).isSame(endThirdQuarter)){
                    ctrl.currentQuarterStart = moment(endThirdQuarter).add(1, 'days');
                    ctrl.currentQuarterEnd = endFourthQuarter;
                }
            });
        }
    }


})();

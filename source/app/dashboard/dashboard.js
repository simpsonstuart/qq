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

            var fiscalYearStart = '01-01-2016';
            var currentDate = moment().format('MM-DD-YYYY');
            var endFirstQuarter = moment(fiscalYearStart, "MM-DD-YYYY").add(3, 'months');
            var endSecondQuarter = moment(endFirstQuarter, "MM-DD-YYYY").add(3, 'months');
            var endThirdQuarter = moment(endSecondQuarter, "MM-DD-YYYY").add(3, 'months');
            var endFourthQuarter = moment(endThirdQuarter, "MM-DD-YYYY").add(3, 'months');

            if(moment(currentDate).isBetween(fiscalYearStart, endFirstQuarter) || moment(currentDate).isSame(fiscalYearStart)){
                ctrl.currentQuarterStart = fiscalYearStart;
                ctrl.currentQuarterEnd = endFirstQuarter;
            }
            if (moment(currentDate).isBetween(endFirstQuarter, endSecondQuarter) || moment(currentDate).isSame(endFirstQuarter)){
                ctrl.currentQuarterStart = endFirstQuarter;
                ctrl.currentQuarterEnd = endSecondQuarter;
            }
            if(moment(currentDate).isBetween(endSecondQuarter, endThirdQuarter) || moment(currentDate).isSame(endSecondQuarter)){
                ctrl.currentQuarterStart = endSecondQuarter;
                ctrl.currentQuarterEnd = endThirdQuarter;
            }
            if(moment(currentDate).isBetween(endThirdQuarter, endFourthQuarter) || moment(currentDate).isSame(endThirdQuarter)){
                ctrl.currentQuarterStart = endThirdQuarter;
                ctrl.currentQuarterEnd = endFourthQuarter;
            }

            UserService.profile('current').then(function (userObject) {
                AuthService.setUser(userObject);
                ctrl.profile = userObject;
                ctrl.allMyDeals = ctrl.profile.active_deals_amount.data.amount;
                ctrl.newDealsAmount = ctrl.profile.last_deal_import_amount.data.amount;
                ctrl.dealsNextWithoutStepsCount = ctrl.profile.deals_without_next_steps_count.data.count;
                ctrl.nextStepsCount             = ctrl.profile.next_steps_count.data.count;
                ctrl.fiscalYearStartMonth = ctrl.profile.fiscal_year_start_month;
            });
        }


    }


})();

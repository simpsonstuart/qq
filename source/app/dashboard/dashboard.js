(function () {
    'use strict';
    angular.module('app.dashboard')
        .controller('Dashboard', Dashboard);
    Dashboard.$inject = ['NumberService', 'DateAndTimeService', 'AuthService', 'UserService', 'moment', 'FiscalYearService'];

    function Dashboard(NumberService, DateAndTimeService, AuthService, UserService, moment, FiscalYearService) {
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
                var quarterDates = FiscalYearService.currentFiscalQuarterDates(currentDate, ctrl.fiscalYearStartMonthNumber);
                ctrl.currentQuarterStart = quarterDates.start;
                ctrl.currentQuarterEnd = quarterDates.end;
            });
        }
    }


})();

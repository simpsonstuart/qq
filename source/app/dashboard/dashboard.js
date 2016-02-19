(function () {
    'use strict';
    angular.module('app.dashboard')
        .controller('Dashboard', Dashboard);

    function Dashboard(NumberService, DateAndTimeService, AuthService, UserService, DealService) {
        var ctrl = this;

        ctrl.convertNumberToWord = NumberService.numberToWord;
        ctrl.formatMoney = NumberService.formatMoney;
        ctrl.currentQuarter = DateAndTimeService.currentQuarter;
        ctrl.dealsWithoutNextSteps = "0";

        _activate();


        function _activate() {

            UserService.profile('current').then(function (userObject) {
                AuthService.setUser(userObject);
                ctrl.profile = userObject;
                ctrl.allMyDeals = ctrl.profile.active_deals_amount.data.amount;
                ctrl.newDealsAmount = ctrl.profile.last_deal_import_amount.data.amount;
                ctrl.dealsNextWithoutStepsCount = ctrl.profile.deals_without_next_steps_count.data.count;
                ctrl.nextStepsCount             = ctrl.profile.next_steps_count.data.count;
            });
        }


    }


})();

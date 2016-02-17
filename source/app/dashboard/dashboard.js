(function () {
    'use strict';
    angular.module('app.dashboard')
        .controller('Dashboard', Dashboard);

    function Dashboard(NumberService, DateAndTimeService, AuthService, UserService, DealService, $stateParams) {
        var ctrl = this;

        ctrl.convertNumberToWord = NumberService.numberToWord;
        ctrl.formatMoney = NumberService.formatMoney;
        ctrl.currentQuarter = DateAndTimeService.currentQuarter;
        ctrl.dealsWithoutNextSteps = "0";
        activate();
        getDealCounts();

        if($stateParams.firstTime === 'true'){
            console.log('true');
            activate();
            getDealCounts();
        }

        function activate() {

            UserService.profile('current').then(function (userObject) {
                AuthService.setUser(userObject);
                ctrl.profile = userObject;
                ctrl.allMyDeals = '8134000';
                ctrl.activeDeals = ctrl.profile.active_deals_amount.data.amount;
                ctrl.incompleteNextSteps = ctrl.profile.incomplete_next_steps.data.count;
            });
        }

        function getDealCounts() {

            DealService.getAll().then(function (data) {
                ctrl.dealsNextWithoutSteps = _.reject(data, "next_step");
                ctrl.dealsNextWithoutStepsCount = _.size(ctrl.dealsNextWithoutSteps);
                ctrl.dealsWithNextSteps = _.filter(data, 'next_step');
                ctrl.nextStepsCount = _.size(ctrl.dealsWithNextSteps);
            });
        }
    }

})();

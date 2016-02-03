angular.module('QQ')
    .controller('ProfileController', ProfileController);

function ProfileController(NumberService, DateAndTimeService, AuthService, UserService) {
    var ctrl = this;

    ctrl.convertNumberToWord = NumberService.numberToWord;
    ctrl.formatMoney = NumberService.formatMoney;
    ctrl.currentQuarter = DateAndTimeService.currentQuarter;
    activate();

    function activate() {

        UserService.profile('current').then(function (userObject) {
            AuthService.setUser(userObject);
            ctrl.profile = userObject;
            ctrl.activeDeals = ctrl.profile.active_deals_amount.data.amount;
            ctrl.incompleteNextSteps = ctrl.profile.incomplete_next_steps.data.count;
        });
    }
}

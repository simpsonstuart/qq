angular.module('QQ')
    .controller('DealsController', DealsController);

function DealsController($scope, AuthService, DealService, UserService, numeral, DateAndTimeService, NumberService, $stateParams) {
    var ctrl = this;

    ctrl.formatDate = DateAndTimeService.formatDate;
    ctrl.convertNumberToWord = NumberService.numberToWord;
    ctrl.formatMoney = NumberService.formatMoney;
    ctrl.timeToClose = DateAndTimeService.daysTill;
    ctrl.dateNow = new Date().toJSON().slice(0,10);

    activate();

    function activate() {
        if ($stateParams.user_id) {
            UserService.get($stateParams.user_id, 'include=role').then(function (data) {
                console.log(data);
                if (data.role.data.name === 'admin') {
                    ctrl.dealsForLabel = 'Organization Deals';
                } else {
                    ctrl.dealsForLabel = "Deals for " + data.name;
                }
            });
        } else {
            if (AuthService.authenticatedUser().role.data.name === 'admin') {
                ctrl.dealsForLabel = 'Organization Deals';
            } else {
                ctrl.dealsForLabel = 'My Deals';
            }
        }

        DealService.getAll(function () {
            return $stateParams.user_id ? 'user_id=' + $stateParams.user_id : null;
        }()).then(function (data) {
            ctrl.deals = data;
        });
    }
}

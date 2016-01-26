angular.module('QQ')
    .controller('ImportDealsController', ImportDealsController);

function ImportDealsController($state, DealService, NumberService) {
    var ctrl = this;
    ctrl.submit = submit;
    ctrl.noDealsToImport = noDealsToImport;
    ctrl.formatMoney = NumberService.formatMoney;
    ctrl.deals = [];
    ctrl.dealsRetrieved = false;

    DealService.importList().then(function (data) {
        ctrl.deals = data;
        ctrl.dealsRetrieved = true;
    });

    function submit() {
        var dealsToImport = _.pluck(checked(), 'id');

        if (dealsToImport.length > 0) {
            DealService.add(dealsToImport).then(function (response) {
                $state.go('root.import-users');
            });
        } else {
            $state.go('root.import-users');
        }
    }

    function checked() {
        return _.filter(ctrl.deals, "isChecked");
    }

    function noDealsToImport() {
        return ctrl.deals.length < 1 && ctrl.dealsRetrieved;
    }
}

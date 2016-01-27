angular.module('QQ')
    .controller('ImportDealsController', ImportDealsController);

function ImportDealsController($state, DealService, NumberService) {
    var ctrl = this;
    ctrl.submit = submit;
    ctrl.noDealsToImport = noDealsToImport;
    ctrl.formatMoney = NumberService.formatMoney;
    ctrl.deals = [];
    ctrl.dealsRetrieved = false;

    activate();

    function submit() {
        var dealsToImport = _.pluck(checked(), 'id');

        if (dealsToImport.length > 0) {
            DealService.add(dealsToImport).then(function (response) {
                console.log('imported deals');
            });
        }
            $state.go('root.profile');
    }

    function checked() {
        return _.filter(ctrl.deals, "isChecked");
    }

    function noDealsToImport() {
        return ctrl.deals.length < 1 && ctrl.dealsRetrieved;
    }

    function activate() {
        DealService.importList().then(function (data) {
            ctrl.deals = data;
            ctrl.dealsRetrieved = true;
        });
    }
}

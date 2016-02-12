(function () {
    'use strict';
    angular.module('app.deal-import')
        .controller('DealImport', DealImport);

    function DealImport($state, DealService, NumberService) {
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
                });
            }
            $state.go('dashboard');
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
                console.log(ctrl.deals);
                console.log(data);
                ctrl.dealsRetrieved = true;
            });
        }
    }

})();

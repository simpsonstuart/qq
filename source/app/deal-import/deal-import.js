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
            var dealsToImport = _.pluck(ctrl.deals, 'id');
            checkImportStatus();

            if (dealsToImport.length > 0) {
                DealService.add(dealsToImport).then(function (response) {

                    if(response.status === 500){
                        ctrl.syncError = true;
                    }
                });
            }

            function checkImportStatus() {
                DealService.getAll().then(function (data) {

                    if (data.length) {
                        ctrl.isSyncing = false;
                        $state.go('dashboard');
                    }
                    else {
                        ctrl.isSyncing = true;
                        setTimeout(checkImportStatus, 50);
                    }

                });
            }
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

})();

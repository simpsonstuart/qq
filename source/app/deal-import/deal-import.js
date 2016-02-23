(function () {
    'use strict';
    angular.module('app.deal-import')
        .controller('DealImport', DealImport);

    function DealImport($state, DealService, NumberService) {
        var ctrl = this;
        ctrl.submit = submit;
        ctrl.noDealsToImport = noDealsToImport;
        ctrl.loading = loading;
        ctrl.formatMoney = NumberService.formatMoney;
        ctrl.deals = [];
        ctrl.dealsRetrieved = false;
        ctrl.noDealsToImport = false;
        ctrl.loadingMessage = false;

        activate();

        function submit() {
            var dealsToImport = _.pluck(ctrl.deals, 'id');
            checkImportStatus();
            ctrl.syncError = false;
            loading('Importing Deals from Salesforce');

            if (dealsToImport.length > 0) {
                DealService.add(dealsToImport).then(function (response) {
                      loading(false);
                }, function () {
                    ctrl.syncError = true;
                });
            } else {
                loading(false);
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

        function loading(message) {
            if(message != undefined) {
                ctrl.loadingMessage = message;
            }

            return ctrl.loadingMessage;
        }

        function noDealsToImport() {
            return ctrl.deals.length < 1 && ctrl.dealsRetrieved;
        }

        function activate() {
            loading('Loading…');
            DealService.importList().then(function (data) {
                ctrl.deals = data;
                ctrl.dealsRetrieved = true;
                loading(false);
                if(!ctrl.deals.length){
                    ctrl.noDealsToImport = true;
                }
            });
        }

    }

})();

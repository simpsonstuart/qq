(function () {
    'use strict';
    angular.module('app.sync')
        .controller('Sync', Sync);

    function Sync(DealService, $scope, NumberService) {
        var ctrl = this;
        ctrl.syncUpdates = syncUpdates;
        ctrl.formatMoney = NumberService.formatMoney;
        ctrl.syncSalesforceUpdates = syncSalesforceUpdates;
        ctrl.syncTraqqUpdates = syncTraqqUpdates;
        ctrl.submit = submit;
        ctrl.noDealsToImport = noDealsToImport;
        ctrl.fromSalesforceDeals = [];
        ctrl.toSalesforceDeals = [];
        ctrl.dealsRetrieved = false;
        ctrl.errorRetrieve = false;

        activate();

        function submit() {
            var dealsToImport = _.pluck(checked(), 'id');

            if (dealsToImport.length > 0) {
                DealService.add(dealsToImport).then(function (response) {
                    console.log('deals imported');
                });
            }
            $state.go('dashboard');
        }

        function noDealsToImport() {
            return ctrl.fromSalesforceDeals.length < 1 && ctrl.dealsRetrieved;
        }

        function activate() {
            DealService.importList().then(function (data) {
                ctrl.fromSalesforceDeals = data;
                ctrl.dealsRetrieved = true;
            }, function (response) {
                ctrl.errorRetrieve = true;
            });

            DealService.deltas().then(function (data) {
                ctrl.toSalesforceDeals = data;
            });
        }

        function syncUpdates() {
            ctrl.isSyncing = true;
        }

        function syncSalesforceUpdates() {
            ctrl.isSyncing = true;
            var dealsToImport = _.pluck(ctrl.fromSalesforceDeals, 'id');

            if (dealsToImport.length > 0) {
                DealService.add(dealsToImport).then(function (response) {
                    console.log(response);
                    ctrl.fromSalesforceDeals = [];
                    ctrl.isSyncing = false;
                });
            }
        }

        function syncTraqqUpdates() {
            ctrl.isSyncing = true;
        }
    }

})();

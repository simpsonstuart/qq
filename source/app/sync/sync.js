(function () {
    'use strict';
    angular.module('app.sync')
        .controller('Sync', Sync);

    function Sync(DealService, NumberService, DateAndTimeService, _, $q) {
        var ctrl = this;
        ctrl.syncUpdates = syncUpdates;
        ctrl.formatMoney = NumberService.formatMoney;
        ctrl.syncSalesforceUpdates = syncSalesforceUpdates;
        ctrl.syncTraqqUpdates = syncTraqqUpdates;
        ctrl.noDealsToImport = noDealsToImport;
        ctrl.submit = submit;
        ctrl.formatFieldName = formatFieldName;
        ctrl.formatValue = formatValue;
        ctrl.fromSalesforceDeals = [];
        ctrl.toSalesforceDeals = [];
        ctrl.dealsRetrieved = false;
        ctrl.errorRetrieve = false;

        activate();

        function submit() {
            var dealsToImport = _.pluck(checked(), 'id');

            if (dealsToImport.length > 0) {
                DealService.add(dealsToImport).then(function (response) {
                });
            }
            $state.go('dashboard');
        }

        function formatFieldName(field) {
            return field.replace("_", " ");
        }

        function formatValue(field, value) {
             if (field == 'amount') {
                 return  ctrl.formatMoney(value);
             }

            if (field == 'close_date') {
                return DateAndTimeService.dateToFormat(value, "MM/DD/YYYY", "YYYY-MM-DD");
            }

            return value;
        }

        function noDealsToImport() {

            if(ctrl.fromSalesforceDeals.length){
                ctrl.noDealsToImport = false;
            }
            else{
                ctrl.noDealsToImport = true;
            }

        }

        function activate() {
            DealService.importList().then(function (data) {
                ctrl.fromSalesforceDeals = data;
                ctrl.dealsRetrieved = true;
                noDealsToImport();
            }, function (response) {
                ctrl.errorRetrieve = true;
            });

            DealService.deltas().then(function (data) {
                ctrl.toSalesforceDeals = data;
            });

        }

        function syncUpdates() {
            ctrl.isSyncing = true;

            $q.all([
                    _syncFromSalesforce(),
                    _syncToSalesforce()
                ])
                .then(function(values) {
                    ctrl.isSyncing = false;
                });
        }

        function syncSalesforceUpdates() {
            ctrl.isSyncing = true;
            var dealsToImport = _.pluck(ctrl.fromSalesforceDeals, 'id');
            _syncFromSalesforce(dealsToImport).then(function (success) {
                 ctrl.isSyncing = false;
            }, function (failure) {
                ctrl.errorRetrieve = true;
            });
        }

        function syncTraqqUpdates() {
            var toSalesforceDealIds = _.pluck(ctrl.toSalesforceDeals, 'id');
            ctrl.isSyncing = true;
                _syncToSalesforce(toSalesforceDealIds).then(function () {
                    ctrl.isSyncing = false;
                }, function (reason) {
                    ctrl.errorRetrieve = true;
                });
        }

        function _syncFromSalesforce() {
            var dealsToImport = _.pluck(ctrl.fromSalesforceDeals, 'id');

            return $q(function(resolve, reject) {
                if (dealsToImport.length > 0) {
                    DealService.add(dealsToImport).then(function (response) {
                        ctrl.fromSalesforceDeals = [];
                        resolve('Synced From Salesforce');
                    }, function (response) {
                        reject('Failure to sync from salesforce');
                    });
                } else {
                    resolve('Nothing to Sync');
                }
            });
        }

        function _syncToSalesforce() {
            var toSalesforceDealIds = _.pluck(ctrl.toSalesforceDeals, 'id');

            return $q(function(resolve, reject) {
                if (toSalesforceDealIds.length > 0) {
                    DealService.syncToSalesforce(toSalesforceDealIds).then(function (response) {
                        ctrl.toSalesforceDeals = [];
                        resolve('Synced to Salesforce');
                    }, function () {
                        reject('failed to Sync to Salesforce');
                    });
                } else {
                    resolve('Nothing to sync');
                }
            });
        }
    }

})();

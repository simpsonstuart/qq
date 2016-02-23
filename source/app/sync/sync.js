(function () {
    'use strict';
    angular.module('app.sync')
        .controller('Sync', Sync);

    function Sync(DealService, NumberService, DateAndTimeService, _, $q, CacheFactory, $rootScope) {
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
        ctrl.loadingFromSalesForce = true;
        ctrl.loadingToSalesForce = true;

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
            if (ctrl.loadingFromSalesForce || ctrl.isSyncing) {
                return false;
            }

            return !ctrl.fromSalesforceDeals.length;
        }

        function activate() {
            DealService.importList().then(function (data) {
                ctrl.loadingFromSalesForce = false;
                ctrl.fromSalesforceDeals = data;
                ctrl.dealsRetrieved = true;
                noDealsToImport();
            }, function (response) {
                ctrl.loadingFromSalesForce = false;
                ctrl.errorRetrieve = true;
            });

            DealService.deltas().then(function (data) {
                ctrl.loadingToSalesForce = false;
                ctrl.toSalesforceDeals = data;
            }, function () {
                ctrl.loadingToSalesForce = false;
                ctrl.errorRetrieve = true;
            });

        }

        function syncUpdates() {
            ctrl.isSyncing = true;

            $q.all([
                    _syncFromSalesforce(),
                    _syncToSalesforce()
                ])
                .then(function(values) {
                    _clearCaches();
                    ctrl.isSyncing = false;
                });
        }

        function syncSalesforceUpdates() {
            ctrl.isSyncing = true;
            var dealsToImport = _.pluck(ctrl.fromSalesforceDeals, 'id');
            _syncFromSalesforce(dealsToImport).then(function (success) {
                 ctrl.isSyncing = false;
                _clearCaches();
            }, function (failure) {
                ctrl.errorRetrieve = true;
                ctrl.isSyncing = false;
                _clearCaches();
            });
        }

        function syncTraqqUpdates() {
            var toSalesforceDealIds = _.pluck(ctrl.toSalesforceDeals, 'id');
            ctrl.isSyncing = true;
                _syncToSalesforce(toSalesforceDealIds).then(function () {
                    ctrl.isSyncing = false;
                    _clearCaches();
                }, function (reason) {
                    ctrl.errorRetrieve = true;
                    ctrl.isSyncing = false;
                    _clearCaches();
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

        function _clearCaches() {
            CacheFactory.clearAll();
            $rootScope.$broadcast('Synced');
        }
    }

})();

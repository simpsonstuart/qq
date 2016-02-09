(function () {
    'use strict';
    angular.module('app.sync')
        .controller('Sync', Sync);

    function Sync($scope, NumberService) {
        var ctrl = this;
        ctrl.syncUpdates = syncUpdates;
        ctrl.formatMoney = NumberService.formatMoney;
        ctrl.syncSalesforceUpdates = syncSalesforceUpdates;
        ctrl.syncTraqqUpdates = syncTraqqUpdates;

        //fictional deals
        ctrl.fromSalesforceDeals = [
            {"name":"Asus LCD Factory Upgrade", "owner":"Travis Jones", "close_date":"1/17/2015", "account_value":"52000", "id":"4564"},
            {"name":"LG Chemical PLC Retrofit", "owner":"Dawn Anderson", "close_date":"2/23/2015", "account_value":"35000", "id":"6748"},
            {"name":"Motorola Mobility Plant Upgrade", "owner":"David Hewitt", "close_date":"1/19/2015", "account_value":"90000", "id":"4746"},
            {"name":"Cloud Electro Server Upgrade", "owner":"Jackson Davis", "close_date":"4/3/2015", "account_value":"83000", "id":"35344"}
        ];

        ctrl.toSalesforceDeals = [
            {"changedFields":{"accountValue":{"newValue":"121000", "previousValue":"320000"}, "nextStep":{"newValue":"Check on deal funding.", "previousValue":"Get deal ready."}}, "name":"Asus LCD Factory Upgrade", "owner":"Travis Jones", "close_date":"1/17/2015", "account_value":"52000", "next_step":"Decide when to start.", "id":"4564"},
            {"changedFields":{"accountValue":{"newValue":"121000", "previousValue":"320000"}, "nextStep":{"newValue":"Check on deal funding.", "previousValue":"Get deal ready."}}, "name":"LG Chemical PLC Retrofit", "owner":"Dawn Anderson", "close_date":"2/23/2015", "account_value":"35000", "next_step":"Get estimates for s3t.", "id":"6748"},
            {"changedFields":{"accountValue":{"newValue":"121000", "previousValue":"320000"}, "nextStep":{"newValue":"Check on deal funding.", "previousValue":"Get deal ready."}}, "name":"Motorola Mobility Plant Upgrade", "owner":"David Hewitt", "close_date":"1/19/2015", "account_value":"90000", "next_step":"Contact the suppliers.", "id":"4746"},
            {"changedFields":{"accountValue":{"newValue":"121000", "previousValue":"320000"}, "nextStep":{"newValue":"Check on deal funding.", "previousValue":"Get deal ready."}}, "name":"Cloud Electro Server Upgrade", "owner":"Jackson Davis", "close_date":"4/3/2015", "account_value":"83000", "next_step":"Cancel the deal as its too late.", "id":"35344"}
        ];

        function syncUpdates() {
            ctrl.isSyncing = true;

        }

        function syncSalesforceUpdates() {
            ctrl.isSyncing = true;

        }

        function syncTraqqUpdates() {
            ctrl.isSyncing = true;

        }

    }

})();
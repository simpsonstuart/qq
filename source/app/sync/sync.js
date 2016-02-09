(function () {
    'use strict';
    angular.module('app.sync')
        .controller('Sync', Sync);

    function Sync($scope) {
        var ctrl = this;
        ctrl.syncUpdates = syncUpdates;

        function syncUpdates() {
            ctrl.isSyncing = true;
        }

    }

})();
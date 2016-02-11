(function () {
    'use strict';
    angular.module('app.edit-close-date')
        .controller('EditCloseDate', EditCloseDate);

    function EditCloseDate($scope, $stateParams, $state) {
        var ctrl = this;
        ctrl.cancel = cancel;
        ctrl.dealId = $stateParams.deal_id;
        ctrl.save = save;
        function cancel () {
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }

        function save () {
            console.log($scope.closeDate);
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }
    }

})();
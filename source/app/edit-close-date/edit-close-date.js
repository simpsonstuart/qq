(function () {
    'use strict';
    angular.module('app.edit-close-date')
        .controller('EditCloseDate', EditCloseDate);

    function EditCloseDate($scope, $stateParams, $state) {
        var ctrl = this;
        ctrl.cancel = cancel;
        ctrl.dealId = $stateParams.deal_id;
        function cancel () {
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }
    }

})();
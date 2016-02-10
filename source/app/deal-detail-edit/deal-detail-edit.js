(function () {
    'use strict';
    angular.module('app.deal-detail-edit')
        .controller('DealDetailEdit', DealDetailEdit);

    function DealDetailEdit($scope, $stateParams, $state) {
        var ctrl = this;
        ctrl.cancel = cancel;
        ctrl.dealId = $stateParams.deal_id;
        function cancel () {
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }
    }

})();
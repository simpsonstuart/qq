(function () {
    'use strict';
    angular.module('app.edit.account')
        .controller('EditAccount', EditAccount);

    function EditAccount($scope, $state, $stateParams) {
        var ctrl = this;
        ctrl.cancel = cancel;
        ctrl.dealId = $stateParams.deal_id;
        function cancel () {
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }
    }

})();
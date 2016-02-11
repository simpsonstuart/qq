(function () {
    'use strict';
    angular.module('app.edit.account')
        .controller('EditAccount', EditAccount);

    function EditAccount($scope, $state, $stateParams) {
        var ctrl = this;
        ctrl.cancel = cancel;
        ctrl.save = save;
        ctrl.dealId = $stateParams.deal_id;
        function cancel () {
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }

        function save () {
            console.log($scope.accountAmount);
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }
    }

})();
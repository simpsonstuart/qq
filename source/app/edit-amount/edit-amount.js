(function () {
    'use strict';
    angular.module('app.edit.amount')
        .controller('EditAmount', EditAmount);

    function EditAmount($scope, $state, $stateParams, DealService) {
        var ctrl = this;
        ctrl.cancel = cancel;
        ctrl.save = save;
        ctrl.dealId = $stateParams.deal_id;
        ctrl.changed = changed;
        ctrl.amount = null;

        activate();

        function activate() {
            ctrl.amount = _original();
        }

        function cancel() {
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }

        function save() {
            DealService.update(ctrl.dealId, {"amount": ctrl.amount}).then(function () {
                $state.go('deal-detail', {deal_id: ctrl.dealId});
            });
        }

        function changed() {
            return _original() == ctrl.amount;
        }

        function _original() {
            var amount = parseInt($stateParams.amount);
            if (amount > 0) {
                return amount;
            }

            return null;
        }
    }

})();

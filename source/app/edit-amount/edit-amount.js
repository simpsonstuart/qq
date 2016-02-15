(function () {
    'use strict';
    angular.module('app.edit.amount')
        .controller('EditAmount', EditAmount);

    function EditAmount($state, $stateParams, DealService) {
        var ctrl = this;
        ctrl.cancel = cancel;
        ctrl.save = save;
        ctrl.dealId = $stateParams.deal_id;
        ctrl.changed = changed;
        ctrl.amount = null;

        _activate();

        /**
         * cancels any changes to deal amount
         *
         * @returns void
         */
        function cancel() {
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }

        /**
         * saves the new deal value if changed
         *
         * @returns void
         */
        function save() {
            if (changed()) {
                DealService.update(ctrl.dealId, {"amount": ctrl.amount}).then(function () {
                    $state.go('deal-detail', {deal_id: ctrl.dealId});
                });
            }
        }

        /**
         * Checks to see if the amount has changed
         *
         * @returns {boolean}
         */
        function changed() {
            return _original() == ctrl.amount;
        }

        /**
         * returns the original amount
         *
         * @returns {int}|null
         * @private
         */
        function _original() {
            var amount = parseInt($stateParams.amount);
            if (amount > 0) {
                return amount;
            }

            return null;
        }

        /**
         * constructor for the controller
         *
         * @private
         */
        function _activate() {
            ctrl.amount = _original();
        }
    }

})();

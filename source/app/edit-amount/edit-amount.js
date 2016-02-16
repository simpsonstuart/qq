(function () {
    'use strict';
    angular.module('app.edit.amount')
        .controller('EditAmount', EditAmount);

    function EditAmount($scope, $state, $stateParams, DealService) {
        var ctrl = this;
        ctrl.cancel = cancel;
        ctrl.save = save;
        ctrl.dealId = $stateParams.deal_id;
        ctrl.saveable = saveable;
        ctrl.notSaveable = notSaveable;
        ctrl.amount = null;
        ctrl.updateSalesforce = false;

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
            if (saveable()) {
                DealService.update(ctrl.dealId, {"amount": ctrl.amount}, _updateSalesforceQuery()).then(function () {
                    $state.go('deal-detail', {deal_id: ctrl.dealId});
                });
            }
        }


        function notSaveable() {
            return !saveable();
        }

        /**
         * Checks to see if the amount has changed
         *
         * @returns {boolean}
         */
        function saveable() {
            return ((_original() != ctrl.amount) && (ctrl.amount > 0));
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

        function _updateSalesforceQuery() {
            if (ctrl.updateSalesforce) {
                return "update-salesforce=true";
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

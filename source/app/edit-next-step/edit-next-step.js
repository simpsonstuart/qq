(function () {
    'use strict';
    angular.module('app.edit-next-step')
        .controller('EditNextStep', EditNextStep);

    function EditNextStep($scope, $stateParams, $state, DealService) {
        var ctrl = this;
        ctrl.cancel = cancel;
        ctrl.save = save;
        ctrl.dealId = $stateParams.deal_id;
        ctrl.nextStep = null;

        activate();

        function activate() {
            DealService.get(ctrl.dealId).then(function (data) {
                ctrl.deal            = data;
                console.log(data);
            });
        }

        function cancel () {
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }

        /**
         * saves the new deal value if changed
         *
         * @returns void
         */
        function save() {
            if (saveable()) {
                DealService.update(ctrl.dealId, {"next_step": ctrl.nextStep}, _updateSalesforceQuery()).then(function () {
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
            return ((_original() != ctrl.nextStep) && ctrl.nextStep.trim());
        }

        /**
         * returns the original amount
         *
         * @returns {string}|null
         * @private
         */
        function _original() {
            var nextStep = $stateParams.next_step;
            if (typeof nextStep == 'string' && nextStep.trim()) {
                return nextStep;
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
            ctrl.next_step = _original();
        }
    }

})();

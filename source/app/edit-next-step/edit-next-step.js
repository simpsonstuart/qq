(function () {
    'use strict';
    angular.module('app.edit-next-step')
        .controller('EditNextStep', EditNextStep);
    EditNextStep.$inject = ['$stateParams', '$state', 'DealService'];

    function EditNextStep($stateParams, $state, DealService) {
        var ctrl = this;
        ctrl.cancel = cancel;
        ctrl.save = save;
        ctrl.nextStepLength = nextStepLength;
        ctrl.dealId = $stateParams.deal_id;
        ctrl.nextStep = null;
        ctrl.updateSalesforce = true;
        ctrl.textUpdated = textUpdated;
        ctrl.errors = [];

        _activate();

        function cancel () {
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }

        /**
         * @returns void
         */
        function save() {
                ctrl.errors = [];
                DealService.update(ctrl.dealId, {"next_step": ctrl.nextStep}, _updateSalesforceQuery()).then(function () {
                    if($stateParams.from_page ==='nextStep') {
                        $state.go('next-steps');
                    }
                    else {
                        $state.go('deal-detail', {deal_id: ctrl.dealId});
                    }
                }, function () {
                    ctrl.errors.push('Server Error');
                });
        }

        function nextStepLength() {
            if(! ctrl.nextStep) {
                return 0;
            }

            return ctrl.nextStep.length;
        }

        function textUpdated() {
            ctrl.updated = true;
        }


        /**
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
            ctrl.nextStep = _original();
        }
    }

})();

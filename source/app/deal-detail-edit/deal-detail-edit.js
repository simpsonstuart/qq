(function () {
    'use strict';
    angular.module('app.deal-detail-edit')
        .controller('DealDetailEdit', DealDetailEdit);

    function DealDetailEdit($scope, $stateParams, $state, DealService, DateAndTimeService, $q) {
        var ctrl = this;
        ctrl.cancel = cancel;
        ctrl.save = save;
        ctrl.dealId = $stateParams.deal_id;
        ctrl.nextStepLength = nextStepLength;
        ctrl.textUpdated = textUpdated;

        ctrl.amount = null;
        ctrl.closeDate = null;
        ctrl.nextStep = null;
        ctrl.updateSalesforce = true;

        _activate();

        function cancel () {
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }

        /**
         * saves the new deal value if changed
         *
         * @returns void
         */
        function save() {
                DealService.update(ctrl.dealId, _changed(), _updateSalesforceQuery()).then(function () {
                    $state.go('deal-detail', {deal_id: ctrl.dealId});
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
         * Checks to see if the amount has changed
         *
         * @returns {boolean}
         */

        function _changed() {
            var changed = {};

            if (DateAndTimeService.dateToFormat(_originalCloseDate(), "MM/DD/YYYY") != _newDate()) {
                changed.close_date = _outDate();
            }

            if (_originalAmount() != ctrl.amount && (ctrl.amount > 0)) {
                changed.amount = ctrl.amount;
            }

            if(ctrl.nextStep != ctrl.deal.next_step && ctrl.nextStep.trim()) {
                changed.next_step = ctrl.nextStep;
            }

            return changed;
        }

        /**
         * returns the original amount
         *
         * @returns {int}|null
         * @private
         */
        function _originalAmount() {
            var amount = parseFloat(ctrl.deal.amount);
            if (amount > 0) {
                return amount;
            }

            return null;
        }

        /**
         * returns the original amount
         *
         * @returns {int}|null
         * @private
         */
        function _originalCloseDate() {
            var closeDate = ctrl.deal.close_date;
            if (closeDate != null) {
                return new Date(DateAndTimeService.dateToFormat(closeDate, "MM/DD/YYYY", "YYYY-MM-DD"));
            }

            return null;
        }

        function _newDate() {
            return DateAndTimeService.dateToFormat(ctrl.closeDate, "MM/DD/YYYY")
        }

        function _outDate() {
            return DateAndTimeService.dateToFormat(_newDate(), "YYYY-MM-DD", "MM/DD/YYYY");
        }

        function _updateSalesforceQuery() {
            if (ctrl.updateSalesforce) {
                return "update-salesforce=true";
            }

            return null;
        }

        function _count(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        }

        /**
         * @returns {Promise}
         * @private
         */
        function _getDeal() {

            return $q(function(resolve, reject) {

                ctrl.deal = $stateParams.deal;

                if (typeof ctrl.deal == "string") {
                    DealService.get($stateParams.deal_id).then(function (deal) {
                        ctrl.deal = deal;
                        resolve('retrieved deal');
                    }, function () {
                        reject('failed to retrieve deal');
                    });
                } else {
                    resolve('retrieved deal');
                }
            });
        }


        function _activate() {
            _getDeal().then(function () {
                ctrl.amount = _originalAmount();
                ctrl.closeDate = _originalCloseDate();
                ctrl.nextStep = ctrl.deal.next_step;
            });
        }
    }

})();

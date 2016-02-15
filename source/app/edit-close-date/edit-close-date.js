(function () {
    'use strict';
    angular.module('app.edit-close-date')
        .controller('EditCloseDate', EditCloseDate);

    function EditCloseDate($scope, $stateParams, $state, DealService, DateAndTimeService) {
        var ctrl = this;
        ctrl.cancel = cancel;
        ctrl.dealId = $stateParams.deal_id;
        ctrl.save = save;
        ctrl.closeDate = null;
        ctrl.saveable = saveable;
        ctrl.notSaveable = notSaveable;

        _activate();

        function cancel () {
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }

        function save () {
            DealService.update(ctrl.dealId, {close_date: _outDate()}, _updateSalesforceQuery()).then(function (response) {
                    console.log(response);
                    //$state.go('deal-detail', {deal_id: ctrl.dealId});
                });
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
            return _original() != _newDate();
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

        /**
         * returns the original amount
         *
         * @returns {int}|null
         * @private
         */
        function _original() {
            var closeDate = $stateParams.close_date;
            if (closeDate != null) {
                return new Date(DateAndTimeService.dateToFormat(closeDate, "MM/DD/YYYY", "YYYY-MM-DD"));
            }

            return null;
        }

        function _activate() {
            ctrl.closeDate = _original();
        }
    }

})();

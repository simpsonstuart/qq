(function () {
    'use strict';
    angular.module('app.set-fiscal-year')
        .controller('SetFiscalYear', SetFiscalYear);
    SetFiscalYear.$inject = ['$state', 'UserService', 'moment', '_', 'DateAndTimeService'];

    function SetFiscalYear($state, UserService, moment, _, DateAndTimeService) {
        var ctrl = this;

        ctrl.monthChanged = monthChanged;
        ctrl.setFiscalYear = setFiscalYear;

        _activate();

        function monthChanged (selectedMonth) {
            var dateNumber = DateAndTimeService.monthNumber(selectedMonth);
            ctrl.numberOfDays = moment(dateNumber, "MM").daysInMonth();
            ctrl.dates = _.range(1, ctrl.numberOfDays + 1);
        }

        function setFiscalYear() {
            return UserService.changeFiscalYear(DateAndTimeService.monthNumber(ctrl.selectedMonth))
                .then(function (response) {
                    $state.go('dashboard');
                }, function (response) {
                    ctrl.fiscalYearError = response.message;
                });
        }

        function _activate() {
            ctrl.selectedMonth = DateAndTimeService.monthName(1);
            ctrl.months = moment.months();
        }

    }
})();

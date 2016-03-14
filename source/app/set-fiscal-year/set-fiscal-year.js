(function () {
    'use strict';
    angular.module('app.set-fiscal-year')
        .controller('SetFiscalYear', SetFiscalYear);
    SetFiscalYear.$inject = ['$state', 'UserService', 'moment', '_', 'AuthService'];

    function SetFiscalYear($state, UserService, moment, _, AuthService) {
        var ctrl = this;

        ctrl.monthChanged = monthChanged;
        ctrl.setFiscalYear = setFiscalYear;
        ctrl.months = moment.monthsShort();

        function monthChanged (selectedMonth) {
            var dateNumber = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(selectedMonth) / 3 + 1 ;
            ctrl.numberOfDays = moment(dateNumber, "MM").daysInMonth();
            ctrl.dates = _.range(1, ctrl.numberOfDays + 1);
        }

        function setFiscalYear() {

            return UserService.changeFiscalYear('current',
                {'email': AuthService.authenticatedUser().email, 'fiscalYearStartMonth': ctrl.selectedMonth}
                )
                .then(function (response) {
                    $state.go('dashboard');
                }, function (response) {
                    ctrl.fiscalYearError = response.message;
                });
        }

    }
})();

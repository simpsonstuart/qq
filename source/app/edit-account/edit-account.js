(function () {
    'use strict';
    angular.module('app.edit.account')
        .controller('EditAccount', EditAccount);

    function EditAccount($scope, $state, $stateParams, DealService) {
        var ctrl = this;
        ctrl.cancel = cancel;
        ctrl.save = save;
        ctrl.dealId = $stateParams.deal_id;

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

        function save () {
            console.log($scope.accountAmount);
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }
    }

})();
(function () {
    'use strict';
    angular.module('app.edit-next-step')
        .controller('EditNextStep', EditNextStep);

    function EditNextStep($scope, $stateParams, $state, DealService) {
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
            console.log($scope.nextStepText);
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }
    }

})();
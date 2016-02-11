(function () {
    'use strict';
    angular.module('app.set-next-step')
        .controller('SetNextStep', SetNextStep);

    function SetNextStep($scope, $stateParams, $state) {
        var ctrl = this;

        ctrl.cancel = cancel;
        ctrl.save = save;
        ctrl.dealId = $stateParams.deal_id;
        function cancel () {
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }

        function save () {
            console.log($scope.nextStepText);
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }
    }

})();
(function () {
    'use strict';
    angular.module('app.deal-detail-edit')
        .controller('DealDetailEdit', DealDetailEdit);

    function DealDetailEdit($scope, $stateParams, $state, DealService) {
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
            $state.go('deal-detail', {deal_id: ctrl.dealId});
        }
    }

})();
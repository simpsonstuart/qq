angular.module('QQ')
    .controller('QuestionControllerReps', QuestionController);

function QuestionController($scope, $stateParams, $state, DealService) {
    var ctrl = this;
    ctrl.dealId = $stateParams.deal_id;

    activate();

    function activate() {
        //if the deal is default or null go to the ask deal page
        if(!$stateParams.deal_id || $stateParams.deal_id === "Deal ID"){
            $state.go('root.ask-deal');
        }
        else {
            DealService.get(ctrl.dealId, 'include=owner,playbook_counts,extended_team').then(function (data) {
                ctrl.deal = data;
            });
        }
    }
}

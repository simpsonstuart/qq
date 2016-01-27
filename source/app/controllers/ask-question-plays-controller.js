angular.module('QQ')
    .controller('askQuestionPlaysController', QuestionController);

function QuestionController($scope, $stateParams, $state, DealService, event) {
    var ctrl = this;
    ctrl.click_askSubmit = click_askSubmit;
    ctrl.dealId = $stateParams.deal_id;

    //if the deal is default or null go to the ask deal page
    if(!$stateParams.deal_id || $stateParams.deal_id === "Deal ID"){
        $state.go('root.ask-deal');
    }
    else{
        DealService.get(ctrl.dealId, 'include=owner,playbook_counts,extended_team').then(function (data) {
            ctrl.deal            = data;
        });
    }

    function click_askSubmit() {
        $state.go('root.ask-reps', {deal_id: ctrl.dealId});
    }
}

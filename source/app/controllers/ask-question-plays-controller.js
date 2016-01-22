angular.module('QQ')
    .controller('askQuestionPlaysController', QuestionController);

function QuestionController($scope, $stateParams, $state) {
    var ctrl = this;
    ctrl.click_askSubmit = click_askSubmit;
    ctrl.deal = $stateParams.deal_id;
    var deal = ctrl.deal;

    //if the deal is default or null go to the ask deal page
    if(!$stateParams.deal_id || $stateParams.deal_id === "Deal ID"){
        $state.go('root.ask-deal');
    }

    function click_askSubmit() {
        $state.go('root.ask-reps', {deal_id: deal});
    }
}

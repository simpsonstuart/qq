angular.module('QQ')
    .controller('askQuestionPlaysController', QuestionController);

function QuestionController($scope, $stateParams, $state) {
    var ctrl = this;
    ctrl.deal = $stateParams.deal_id;

    //if the deal is default or null go to the ask deal page
    if(!$stateParams.deal_id || $stateParams.deal_id === "Deal ID"){
        $state.go('root.ask-deal');
    }
}

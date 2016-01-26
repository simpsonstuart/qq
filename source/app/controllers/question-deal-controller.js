angular.module('QQ')
    .controller('QuestionControllerDeal', QuestionController);

function QuestionController($scope, $state, $stateParams) {
    var ctrl = this;
    ctrl.click_dealSubmit = click_dealSubmit;

    //store the selected deal then go to the next part of ask questions
    function click_dealSubmit(deal) {
        $state.go('root.ask-questions', {deal_id: deal});
    }
}


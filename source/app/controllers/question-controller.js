angular.module('QQ')
    .controller('QuestionController', QuestionController);

function QuestionController($scope, $state, $stateParams) {
    var ctrl = this;
    ctrl.click_addPlay= click_addPlay;
    ctrl.click_dealSubmit= click_dealSubmit;
    ctrl.deal = "test";

    function click_addPlay() {
        ctrl.expand_show_addPlay = true;
        ctrl.showPlayExpanded = true;
    }

    //store the selected deal then go to the next part of ask questions
    function click_dealSubmit(deal) {
        console.log(deal);
        $state.go('root.ask-questions', {deal_id: deal});
    }
}

angular.module('QQ')
    .controller('QuestionController', QuestionController);

function QuestionController($scope, $state, $stateParams) {
    var ctrl = this;
    ctrl.click_addPlay= click_addPlay;
    ctrl.click_questionSubmit = click_questionSubmit;
    ctrl.deal = $stateParams.deal_id;

    function click_addPlay() {
        ctrl.expand_show_addPlay = true;
        ctrl.showPlayExpanded = true;
    }

    //pass the dealId on to choose reps
    function click_questionSubmit(deal) {
        $state.go('root.ask-reps', {deal_id: deal});
    }
}


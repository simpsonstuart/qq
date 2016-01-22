angular.module('QQ')
    .controller('QuestionController', QuestionController);

function QuestionController($scope, $state, $stateParams) {
    var ctrl = this;
    ctrl.click_addPlay= click_addPlay;
    ctrl.click_questionSubmit = click_questionSubmit;
    ctrl.click_playSelect = click_playSelect;
    ctrl.deal = $stateParams.deal_id;
    var dealQuestion = $scope.dealQuestion;
    var deal = ctrl.deal;
    console.log(dealQuestion);

    //if the deal is default or null go to the ask deal page
    if($stateParams.deal_id === "Deal ID" || $stateParams.deal_id === null){
        $state.go('root.ask-deal');
    }

    function click_addPlay() {
        ctrl.expand_show_addPlay = true;
        ctrl.showPlayExpanded = true;
    }

    function click_playSelect() {
        $state.go('root.ask-play-questions', {deal_id: deal});
    }


    //pass the dealId on to choose reps
    function click_questionSubmit() {
        $state.go('root.ask-reps', {deal_id: deal});
    }
}


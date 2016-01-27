angular.module('QQ')
    .controller('QuestionController', QuestionController);

function QuestionController($scope, $state, $stateParams, DealService) {
    var ctrl                  = this;
    ctrl.click_addPlay        = click_addPlay;
    ctrl.click_questionSubmit = click_questionSubmit;
    ctrl.click_playSelect     = click_playSelect;
    ctrl.dealId               = $stateParams.deal_id;
    activate();

    function click_addPlay() {
        ctrl.expand_show_addPlay = true;
        ctrl.showPlayExpanded    = true;
    }

    function click_playSelect() {
        $state.go('root.ask-play-questions', {deal_id: ctrl.dealId});
    }


    //pass the dealId on to choose reps
    function click_questionSubmit() {
        $state.go('root.ask-reps', {deal_id: ctrl.dealId});
    }

    function activate() {
        //if the deal is default or null go to the ask deal page otherwise proceeed to get data
        if ($stateParams.deal_id === "Deal ID" || $stateParams.deal_id === null) {
            $state.go('root.ask-deal');
        }
        else {
        }
        DealService.get(ctrl.dealId, 'include=owner,playbook_counts,extended_team').then(function (data) {
            ctrl.deal = data;
        });
    }
}


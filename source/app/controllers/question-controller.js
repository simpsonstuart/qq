angular.module('QQ')
    .controller('QuestionController', QuestionController);

function QuestionController($scope, $stateParams, $state, $stateProvider) {
    var ctrl = this;
    ctrl.click_addPlay= click_addPlay;
    ctrl.click_dealSubmit= click_dealSubmit;

    ctrl.deal_id = $stateParams;
    console.log(ctrl.deal_id);

    function click_addPlay() {
        ctrl.expand_show_addPlay = true;
        ctrl.showPlayExpanded = true;
    }

    function click_dealSubmit() {
        $state.go('root.ask-questions', {'deal': "test"});
    }
}

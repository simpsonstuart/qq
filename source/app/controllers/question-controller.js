angular.module('QQ')
    .controller('QuestionController', QuestionController);

function QuestionController($scope, $stateParams) {
    var ctrl = this;
    ctrl.click_addPlay= click_addPlay;

    ctrl.deal_id = $stateParams.deal_id;

    function click_addPlay() {
        ctrl.expand_show_addPlay = true;
        ctrl.showPlayExpanded = true;
    }
}

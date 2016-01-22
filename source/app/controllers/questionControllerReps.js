angular.module('QQ')
    .controller('QuestionControllerReps', QuestionControllerReps);

function QuestionControllerReps($scope, $state, $stateParams) {
    var ctrl = this;
    ctrl.deal = $stateParams.deal_id;
}

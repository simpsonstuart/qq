angular.module('QQ')
    .controller('QuestionControllerReps', QuestionController);

function QuestionController($scope, $stateParams) {
    var ctrl = this;
    ctrl.deal = $stateParams.deal_id;
}

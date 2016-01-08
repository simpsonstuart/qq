angular.module('QQ')
    .controller('QuestionController', QuestionController);

function QuestionController($scope, $stateParams) {
    var ctrl = this;

    ctrl.deal_id = $stateParams.deal_id
}

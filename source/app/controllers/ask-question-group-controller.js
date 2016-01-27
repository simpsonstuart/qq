angular.module('QQ')
    .controller('QuestionGroupController', QuestionGroupController);

function QuestionGroupController($scope, $stateParams) {
    var ctrl = this;

    ctrl.deal_id = $stateParams.deal_id
}

angular.module('QQ')
    .controller('DealQuestionController', DealQuestionController);

function DealQuestionController($scope, $state) {
    var ctrl = this;
    ctrl.click_dealSubmit = click_dealSubmit;

    //pass the selected deal to the next part of ask questions
    function click_dealSubmit(dealValue) {
        $state.go('root.ask-questions', {deal_id: dealValue});
    }
}


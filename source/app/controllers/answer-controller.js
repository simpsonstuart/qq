angular.module('QQ')
    .controller('AnswerController', AnswerController);
     AnswerController.$inject = ['$scope','$stateParams','DealService'];

function AnswerController($scope, $stateParams, DealService) {
    var ctrl = this;
    ctrl.textAnswer = textAnswer;
    ctrl.YesNoAnswer = YesNoAnswer;
    ctrl.dealId = $stateParams.deal_id;


    DealService.get(ctrl.dealId, 'include=owner,playbook_counts,extended_team').then(function (data) {
        ctrl.deal            = data;
    });

        //fictional questions
         ctrl.questions = [
            {"question":"Is the funding available now?", "askedBy":"Travis Jones", "questionType":"YesNo", "askedDate":"1/17/2016", "questionId":"3535"},
            {"question":"When will sr3 be ready?", "askedBy":"Dawn Anderson", "questionType":"Text", "askedDate":"2/23/2015", "questionId":"2343"},
            {"question":"How much is project magenta worth?", "askedBy":"David Hewitt", "questionType":"YesNo", "askedDate":"8/17/2015", "questionId":"3635"},
            {"question":"Has proposal e3 been met in accordance to proposition 68?", "askedBy":"Jackson Davis", "questionType":"Text", "askedDate":"1/11/2016", "questionId":"897"}
        ];

    function YesNoAnswer(questionId, selection, comment) {

        ctrl.answer = selection;
    }

    function textAnswer(questionId, answer, comment) {
            ctrl.answer       = answer;
            ctrl.lastQuestion = questionId;
            ctrl.isAnswered  = questionId;

    }
}

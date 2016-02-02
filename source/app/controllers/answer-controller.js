angular.module('QQ')
    .controller('AnswerController', AnswerController);
     AnswerController.$inject = ['$scope','$stateParams','DealService'];

function AnswerController($scope, $stateParams, DealService) {
    var ctrl = this;
    ctrl.textAnswer = textAnswer;
    ctrl.boolAnswer = boolAnswer;
    ctrl.dealId = $stateParams.deal_id;
    ctrl.getTemplate = getTemplate;


    DealService.get(ctrl.dealId, 'include=owner,playbook_counts,extended_team').then(function (data) {
        ctrl.deal            = data;
    });

        //fictional questions
         ctrl.questions = [
            {"question":"Is the funding available now?", "askedBy":"Travis Jones", "questionType":"bool", "askedDate":"1/17/2016", "questionId":"3535"},
            {"question":"When will sr3 be ready?", "askedBy":"Dawn Anderson", "questionType":"text", "askedDate":"2/23/2015", "questionId":"2343"},
            {"question":"How much is project magenta worth?", "askedBy":"David Hewitt", "questionType":"bool", "askedDate":"8/17/2015", "questionId":"3635"},
            {"question":"Has proposal e3 been met in accordance to proposition 68?", "askedBy":"Jackson Davis", "questionType":"text", "askedDate":"1/11/2016", "questionId":"897"}
        ];

    function boolAnswer(questionId, selection, comment) {

            ctrl.boolAnswered = questionId;
    }

    function textAnswer(questionId, answer, comment) {
            ctrl.answer       = answer;
            ctrl.isAnswered  = questionId;

    }

    //set question template based on question type
    function getTemplate(questionType) {
        if (questionType === 'bool') {
            return "includes/templates/questions/question-bool-type.html";
        } else if (questionType === 'amount') {
            return "includes/templates/questions/question-amount-type.html";

        } else if (questionType === 'date'){
            return "includes/templates/questions/question-date-type.html";

        } else if (questionType === 'text'){
            return "includes/templates/questions/question-text-type.html";
        } else if (questionType === 'amount'){
            return "includes/templates/questions/question-amount-type.html";
        }
    }
}

angular.module('QQ')
    .controller('AnswerController', AnswerController);
     AnswerController.$inject = ['$scope','$stateParams','DealService'];

function AnswerController($scope, $stateParams, DealService) {
    var ctrl = this;
    ctrl.getAnswer = getAnswer;
    ctrl.showAnswered = showAnswered;
    ctrl.dealId = $stateParams.deal_id;
    ctrl.getTemplate = getTemplate;


    DealService.get(ctrl.dealId, 'include=owner,playbook_counts,extended_team').then(function (data) {
        ctrl.deal            = data;
    });

        //fictional questions
         ctrl.questions = [
             {"question":"Is the funding available now?", "askedBy":"Travis Jones", "questionType":"bool", "askedDate":"1/17/2016", "questionId":"3535"},
             {"question":"How much is s3 worth?", "askedBy":"Dawn Anderson", "questionType":"amount", "askedDate":"2/23/2015", "questionId":"2343"},
             {"question":"What is the best course of action for project magenta?", "askedBy":"David Hewitt", "questionType":"text", "askedDate":"8/17/2015", "questionId":"3635"},
             {"question":"What is the close date for E3 Ch2mill?", "askedBy":"Jackson Davis", "questionType":"date", "askedDate":"1/11/2016", "questionId":"897"},
             {"question":"Is starbucks server upgrade complete?", "askedBy":"Blake Simpson", "questionType":"bool", "askedDate":"2/1/2016", "questionId":"397"},
             {"question":"Did the dell modulator repair close?", "askedBy":"Sara Thorp", "questionType":"bool", "askedDate":"2/3/2016", "questionId":"592"}
        ];

    function getAnswer(questionId, answer, comment) {

        console.log(questionId, answer, comment)
    }

    function showAnswered(question) {

        if(_.has(question, 'boolSelection') || _.has(question, 'textAnswerInput')
            || _.has(question, 'dateSelection') || _.has(question, 'amountAnswerInput')) {
            return "true";
        } else {
            return "false";
        }
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

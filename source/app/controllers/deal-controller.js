angular.module('QQ')
    .controller('DealController', DealController);

function DealController($scope, DealService, $stateParams, numeral, DateAndTimeService, NumberService, $state, $window) {
    var ctrl = this;

    ctrl.dealId = $stateParams.deal_id;

    ctrl.formatMoney = formatMoney;
    ctrl.formatDate = DateAndTimeService.formatDate;
    ctrl.sortQuestionAnswers = sortQuestionAnswers;
    ctrl.height = height;
    ctrl.convertNumberToWord = NumberService.numberToWord;
    ctrl.goToQuestions = goToQuestions;
    ctrl.goToSendQuestionGroup = goToSendQuestionGroup;
    ctrl.syncWithSalesforce = syncWithSalesforce;
    ctrl.viewDealSalesforce = viewDealSalesforce;


    DealService.get(ctrl.dealId, 'include=owner,playbook_counts,extended_team').then(function (data) {
        ctrl.deal            = data;
        ctrl.weekCounts      = ctrl.deal.week_counts;
        ctrl.playbook_counts = data.playbook_counts.data;
        ctrl.extended_team   = data.extended_team.data;
        ctrl.close_date      = ctrl.formatDate(ctrl.deal.close_date).format('M/D/YYYY');
        ctrl.account_value   = ctrl.formatMoney(ctrl.deal.account_value);
        ctrl.dealSalesforceLink = data.salesforce_id;
    });


    function formatMoney (integer) {
        return numeral(integer).format('$0,0');
    };

    function sortQuestionAnswers(data) {
        return _.sortBy(data);
    };

    function height(count) {
        return {
            height: count + '%'
        };
    };

    function goToQuestions() {
        $state.go('root.deal-feed', {deal_id: ctrl.deal.id});
    };

     function goToSendQuestionGroup() {
        $state.go("root.send-question-group", {deal_id: ctrl.deal.id});
    };

    function syncWithSalesforce() {
        //add salesforce sync logic here
    };

    //redirect user too the deal in salesforce
    function viewDealSalesforce() {
        $window.location.href = "https://na34"+ ".salesforce.com/"+ ctrl.dealSalesforceLink;
    };
}

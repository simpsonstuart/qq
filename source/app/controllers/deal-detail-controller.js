angular.module('QQ')
    .controller('DealDetailController', DealDetailController);

function DealDetailController(DealService, $stateParams, numeral, DateAndTimeService, NumberService, $state, $window, AuthService, CacheFactory) {
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
    ctrl.favorite = favorite;
    ctrl.showAnswerQuestionForPlaybookName = showAnswerQuestionForPlaybookName;
    ctrl.goToPlayFeed = goToPlayFeed;

    activate();


    function formatMoney(integer) {
        return numeral(integer).format('$0,0');
    }

    function goToPlayFeed(playbookName, playId) {
        if (false == showAnswerQuestionForPlaybookName(playbookName)) {
            return false;
        } else {
            $state.go('root.deals.play', {deal_id: ctrl.deal.id, play_id: playId});
        }
    }

    function sortQuestionAnswers(data) {
        return _.sortBy(data);
    }

    function height(count) {
        return {
            height: count + '%'
        };
    }

    function showAnswerQuestionForPlaybookName(playbook_name) {
        return playbook_name.toLowerCase() != 'campaign';
    }

    function goToQuestions() {
        $state.go('root.deal-feed', {deal_id: ctrl.deal.id});
    }

     function goToSendQuestionGroup() {
        $state.go("root.send-question-group", {deal_id: ctrl.deal.id});
    }

    function syncWithSalesforce() {
        if (ctrl.deal.salesforce_id) {
            DealService.syncWithSalesforce(ctrl.deal).then(function (data) {
                data = data.data;
                ctrl.close_date      = ctrl.formatDate(data.close_date).format('M/D/YYYY');
                ctrl.account_value   = ctrl.formatMoney(data.account_value);
                ctrl.deal.name = data.name;
                CacheFactory.clearAll();
            });
        }
    }

    function viewDealSalesforce() {
        if (AuthService.authenticatedUser().salesforce_instance_url) {
            $window.location.href = AuthService.authenticatedUser().salesforce_instance_url + '/' + ctrl.deal.salesforce_id;
        }
    }

    function favorite() {
        DealService.favorite(ctrl.deal.id);
        ctrl.deal.favorite = !ctrl.deal.favorite;
    }

    function activate() {
        DealService.get(ctrl.dealId, 'include=owner,playbook_counts,extended_team').then(function (data) {
            ctrl.deal            = data;
            ctrl.playbook_counts = data.playbook_counts.data;
            ctrl.extended_team   = data.extended_team.data;
            ctrl.close_date      = ctrl.formatDate(ctrl.deal.close_date).format('M/D/YYYY');
            ctrl.account_value   = ctrl.formatMoney(ctrl.deal.account_value);
        });
    }
}

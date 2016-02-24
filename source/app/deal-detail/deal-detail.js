(function () {
    'use strict';
    angular.module('app.deal-detail')
        .controller('DealDetail', DealDetail);

    function DealDetail(DealService, $stateParams, DateAndTimeService, NumberService, $state, $window, AuthService, CacheFactory, $rootScope) {
        var ctrl = this;

        ctrl.dealId = $stateParams.deal_id;
        ctrl.isSyncing = false;
        ctrl.formatMoney = formatMoney;
        ctrl.formatDate = DateAndTimeService.formatDate;
        ctrl.sortQuestionAnswers = sortQuestionAnswers;
        ctrl.height = height;
        ctrl.convertNumberToWord = NumberService.numberToWord;
        ctrl.goToQuestions = goToQuestions;
        ctrl.goToSendQuestionGroup = goToSendQuestionGroup;
        ctrl.syncWithSalesforce = syncWithSalesforce;
        ctrl.viewDealSalesforce = viewDealSalesforce;
        ctrl.editamount = editamount;
        ctrl.editCloseDate = editCloseDate;
        ctrl.editNextStep = editNextStep;
        ctrl.favorite = favorite;
        ctrl.showAnswerQuestionForPlaybookName = showAnswerQuestionForPlaybookName;
        ctrl.goToPlayFeed = goToPlayFeed;
        ctrl.editDealDetail = editDealDetail;

        activate();


        function formatMoney(number, format) {
            return NumberService.formatMoney(number, format);
        }

        function goToPlayFeed(playbookName, playId) {
            if (false == showAnswerQuestionForPlaybookName(playbookName)) {
                return false;
            } else {
                $state.go('deal-list.play', {deal_id: ctrl.deal.id, play_id: playId});
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
            $state.go('deal-feed', {deal_id: ctrl.deal.id});
        }

        function goToSendQuestionGroup() {
            $state.go("send-question-group", {deal_id: ctrl.deal.id});
        }

        function editDealDetail() {
            $state.go('deal-detail-edit', {deal_id: ctrl.deal.id});
        }

        function editamount() {
            $state.go('edit-amount', {deal_id: ctrl.deal.id});
        }

        function editCloseDate() {
            $state.go('edit-close-date', {deal_id: ctrl.deal.id});
        }

        function editNextStep() {
            $state.go('edit-next-step', {deal_id: ctrl.deal.id});
        }

        function syncWithSalesforce() {
            if (ctrl.deal.id) {
                ctrl.isSyncing = true;
                DealService.syncToSalesforce([ctrl.deal.id]).then(function (response) {
                    ctrl.isSyncing         = false;
                    _clearCaches();
                });
            }
        }

        function viewDealSalesforce() {
            if (AuthService.authenticatedUser().salesforce_instance_url) {
                $window.open( AuthService.authenticatedUser().salesforce_instance_url + '/' + ctrl.deal.salesforce_id);
            }
        }

        function favorite() {
            DealService.favorite(ctrl.deal.id);
            ctrl.deal.favorite = !ctrl.deal.favorite;
        }

        function activate() {
            DealService.get(ctrl.dealId, 'include=owner,playbook_counts,extended_team').then(function (data) {
                ctrl.deal            = data;
                ctrl.close_date      = ctrl.formatDate(ctrl.deal.close_date).format('M/D/YYYY');
                ctrl.amount   = ctrl.formatMoney(ctrl.deal.amount, '$0,0.00');
            });
        }

        function _clearCaches() {
            CacheFactory.clearAll();
            $rootScope.$broadcast('Synced');
        }
    }

})();

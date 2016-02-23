(function () {
    'use strict';
    angular.module('app.deal-list')
        .controller('DealList', DealList);

    function DealList(DealService, DateAndTimeService, NumberService) {
        var ctrl = this;

        ctrl.formatDate = DateAndTimeService.formatDate;
        ctrl.convertNumberToWord = NumberService.numberToWord;
        ctrl.formatMoney = NumberService.formatMoney;
        ctrl.timeToClose = DateAndTimeService.daysTill;
        ctrl.dateNow = new Date().toJSON().slice(0,10);
        ctrl.favorite = favorite;
        ctrl.selectedSort = 'close_date';
        ctrl.noDeals = false;

        activate();

        function activate() {
            ctrl.loading = true;
            ctrl.dealsForLabel = 'My Deals';

            DealService.getAll().then(function (data) {
                ctrl.deals = data;
                ctrl.loading = false;

                if (! ctrl.deals.length) {
                   ctrl.noDeals = true;
                }
            });
        }

        function favorite(deal) {
            DealService.favorite(deal.id);
            deal.favorite = !deal.favorite;
        }
    }

})();

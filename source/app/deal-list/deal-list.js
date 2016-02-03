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

        activate();

        function activate() {
            ctrl.dealsForLabel = 'My Deals';

            DealService.getAll().then(function (data) {
                ctrl.deals = data;
            });
        }

        function favorite(deal) {
            DealService.favorite(deal.id);
            deal.favorite = !deal.favorite;
        }
    }

})();

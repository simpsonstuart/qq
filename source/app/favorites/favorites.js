(function () {
    'use strict';
    angular.module('app.favorites')
        .controller('Favorites', Favorites);

    function Favorites($scope, DealService, DateAndTimeService, NumberService) {
        var ctrl = this;

        ctrl.formatDate = DateAndTimeService.formatDate;
        ctrl.convertNumberToWord = NumberService.numberToWord;
        ctrl.formatMoney = NumberService.formatMoney;
        ctrl.timeToClose = DateAndTimeService.daysTill;
        ctrl.dateNow = new Date().toJSON().slice(0,10);
        ctrl.selectedSort = 'close_date';
        ctrl.favorite = favorite;

        activate();

        function activate() {

            DealService.getAll().then(function (data) {
                ctrl.favoriteDeals = _.filter(data, 'favorite');
            });
        }

        function favorite(deal) {
            var deals = ctrl.favoriteDeals;
            DealService.favorite(deal.id);
            deal.favorite = !deal.favorite;
            ctrl.favoriteDeals.favorite = !ctrl.favoriteDeals.favorite;
            ctrl.favoriteDeals = _.filter(deals, 'favorite');
        }
    }

})();
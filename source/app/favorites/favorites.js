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
        ctrl.loading = false;
        ctrl.noFavoriteDeals = false;
        ctrl.favorite = favorite;

        activate();

        //get deals that are favorites
        function activate() {
            ctrl.loading = true;
            DealService.getAll().then(function (data) {
                ctrl.loading = false;
                ctrl.favoriteDeals = _.filter(data, 'favorite');
                ctrl.noFavoriteDeals = (ctrl.favoriteDeals.length < 1);
            }, function (response) {
                ctrl.loading = false;
            });
        }

        //remove deal from favorites logic
        function favorite(deal) {
            var deals = ctrl.favoriteDeals;
            DealService.favorite(deal.id);
            deal.favorite = !deal.favorite;
            ctrl.favoriteDeals.favorite = !ctrl.favoriteDeals.favorite;
            ctrl.favoriteDeals = _.filter(deals, 'favorite');
        }
    }

})();

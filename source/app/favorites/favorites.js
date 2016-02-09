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

        activate();

        function activate() {
            ctrl.dealsForLabel = 'My Deals';

            DealService.getAll().then(function (data) {
                ctrl.favoriteDeals = _.filter(data, 'favorite');
            });
        }
    }

})();
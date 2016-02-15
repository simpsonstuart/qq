(function () {
    'use strict';
    angular.module('app')
        .factory('DealService', DealService);

    function DealService(ApiService) {

        return {
            deltas: deltas,
            getAll: getAll,
            get: get,
            feed: feed,
            feedDetail: feedDetail,
            importList: importList,
            add: add,
            favorite: favorite,
            syncWithSalesforce: syncWithSalesforce,
            update: update
        };


        function getAll(query) {
            return ApiService.get('deals', query);
        }

        function get(dealId, query) {
            return ApiService.get('deals/' + dealId, query);
        }

        function feed(dealId) {
            return ApiService.get('deals/' + dealId + '/feed');
        }

        function feedDetail(dealId) {
            return ApiService.get('deals/' + dealId + '/feed/detail');
        }

        function favorite(dealId) {
            return ApiService.post('deals/' + dealId + '/favorite', []);
        }

        function syncWithSalesforce(deal) {
            return ApiService.post('deals/' + deal.id + '/sync', deal);
        }

        function importList() {
            return ApiService.get('deals/import');
        }

        function deltas() {
            return ApiService.get('deals/deltas');
        }

        /**
         * @param {Array.<string>} dealIds
         * @returns {Promise}
         */
        function add(dealIds) {
            return ApiService.post('deals/import', {ids: dealIds});
        }

        /**
         * @param {int} id
         * @param {object} fields  the fields to update
         * @returns {Promise}
         */
        function update(id, fields) {
            console.log(fields);
            return ApiService.post('deals/' + id, fields);
        }
    }

})();

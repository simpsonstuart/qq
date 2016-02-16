(function () {
    'use strict';
    angular.module('app')
        .factory('DealService', DealService);

    function DealService(ApiService) {

        return {
            deltas: deltas,
            getAll: getAll,
            get: get,
            importList: importList,
            add: add,
            favorite: favorite,
            syncWithSalesforce: syncWithSalesforce,
            update: update,
            syncToSalesforce: syncToSalesforce
        };

        /**
         * retrieves all deals
         *
         * @param {string} query
         * @returns {*|Promise.<T>|V|Promise.<T>|V|*}
         */
        function getAll(query) {
            return ApiService.get('deals', query);
        }

        /**
         * retrieves a single deal
         *
         * @param {int} dealId
         * @param {string} query
         * @returns {*|Promise.<T>|V}
         */
        function get(dealId, query) {
            return ApiService.get('deals/' + dealId, query);
        }

        /**
         * favorites a deal
         *
         * @param {int} dealId
         * @returns {Promise.<T>}
         */
        function favorite(dealId) {
            return ApiService.post('deals/' + dealId + '/favorite', []);
        }

        /**
         * syncs a single deal with salesforce
         *
         * @param {object} deal
         * @returns {Promise.<T>}
         */
        function syncWithSalesforce(deal) {
            return ApiService.post('deals/' + deal.id + '/sync', deal);
        }

        /**
         * returns importable deals from salesforce
         *
         * @returns {*|Promise.<T>|V}
         */
        function importList() {
            return ApiService.get('deals/import');
        }

        /**
         * returns the deltas for all deals
         *
         * @returns {*|Promise.<T>|V}
         */
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
         * @param {string} query
         * @returns {*|Promise.<T>|V}
         */
        function update(id, fields, query) {
            return ApiService.post('deals/' + id, fields, query);
        }

        /**
         * @param {Array} dealIds
         * @returns {Promise.<T>}
         */
        function syncToSalesforce(dealIds) {
            return ApiService.post('deals/sync/batch', {deal_ids: dealIds});
        }
    }

})();

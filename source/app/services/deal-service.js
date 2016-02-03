angular.module('QQ')
    .factory('DealService', DealService);

function DealService(ApiService) {

    return {
        getAll: getAll,
        get: get,
        feed: feed,
        feedDetail: feedDetail,
        questionsAndAnswersCountGroupedByWeek: questionsAndAnswersCountGroupedByWeek,
        playbooks: playbooks,
        addPlay: addPlay,
        importList: importList,
        add: add,
        favorite: favorite,
        syncWithSalesforce: syncWithSalesforce
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

    function add(deals) {
        return ApiService.post('deals/import', {ids: deals});
    }
}

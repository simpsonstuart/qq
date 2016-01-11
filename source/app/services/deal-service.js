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
        addPlay: addPlay
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

    function questionsAndAnswersCountGroupedByWeek(data) {
        var questionsAndAnswers, counted, yearWeek;
        questionsAndAnswers = _.groupBy(data, function (item) {
            return moment(item.timestamp).year() + '-' + moment(item.timestamp).week();
        });

        counted = _.map(questionsAndAnswers, function (collection, key) {
            var result;
            result = _.countBy(collection, function (item) {
                return item.type;
            });

            result['year-week-key'] = key;
            yearWeek = key.split('-');
            result['year'] = yearWeek[0];
            result['week'] = yearWeek[1];
            result['total'] = (result['question'] ? result['question'] : 0) + (result['answer'] ? result['answer'] : 0);

            return result;
        });

        return _.sortBy(counted, 'year-week-key');
    }

    function playbooks(dealId) {
        return ApiService.get('deals/' + dealId + '/playbooks');
    }

    function addPlay(dealId, playIds) {
        return ApiService.post('deals/' + dealId + '/plays', {ids: playIds});
    }
}

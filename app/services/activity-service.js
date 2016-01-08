angular.module('QQ')
    .factory('ActivityService', ActivityService);

function ActivityService(ApiService, $q) {
    return {
        getInbox: getInbox,
        getInboxPending: getInboxPending,
        getSent: getSent,
        getSentPending: getSentPending,
        pendingCounts: pendingCounts
    };

    function getInbox() {
        return ApiService.get('activity');
    }

    function getInboxPending() {
        return ApiService.get('activity', 'filter=pending');
    }

    function getSent() {
        return ApiService.get('activity', 'filter=sent');
    }

    function getSentPending() {
        return ApiService.get('activity', 'filter=sent,pending');
    }

    function pendingCounts() {
        return ApiService.get('activity', 'filter=pending_counts');
    }
}

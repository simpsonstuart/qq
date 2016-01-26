angular.module('QQ')
    .controller('FeedController', FeedController);

function FeedController($scope, ActivityService, _, moment, AuthService, $state, $q) {
    var ctrl = this;
    ctrl.inboxActive = true;
    ctrl.sentActive = false;
    ctrl.sentItems = null;
    ctrl.sentPendingItems = null;
    ctrl.inboxPendingCount = 0;
    ctrl.sentPendingCount = 0;
    ctrl.user = AuthService.authenticatedUser();
    ctrl.getItemsGroupedByDay = getItemsGroupedByDay;
    ctrl.formatDate = formatDate;
    ctrl.goToDeal = goToDeal;
    ctrl.weHavePendingItems = weHavePendingItems;
    ctrl.weDoNotHavePendingItems = weDoNotHavePendingItems;
    ctrl.goToAnswer = goToAnswer;
    ctrl.clickSent = clickSent;
    ctrl.clickInbox = clickInbox;
    ctrl.showPending = showPending;
    ctrl.getActivityTypeDisplayString = getActivityTypeDisplayString;

    activate();

    function goToDeal(dealId, event) {
        event.preventDefault();
        event.stopPropagation();

        $state.go('root.deals.detail', {deal_id: dealId});
    }

    function getItemsGroupedByDay(data) {
        return _.groupBy(data, function (item) {
            return moment(item.timestamp).format("YYYY-MM-DD");
        });
    }

    function formatDate(date) {
        return moment(date);
    }

    function weHavePendingItems() {
        if (ctrl.pendingItems === undefined || ctrl.pendingItems == null) {
            return false;
        }

        return ctrl.pendingItems.length > 0;
    }

    function weDoNotHavePendingItems() {
        if (ctrl.pendingItems === undefined || ctrl.pendingItems == null) {
            return true;
        }

        return ctrl.pendingItems.length < 1;
    }

    function goToAnswer(deal_id) {
        $state.go('root.answer-question', {deal_id: deal_id});
    }

    function clickSent() {
        ctrl.feedItems = null;
        ctrl.pendingItems = null;
        ctrl.inboxActive = false;
        ctrl.sentActive = true;

        ctrl.pendingItems = ctrl.sentPendingItems;
        ctrl.feedItems = ctrl.sentItems;
    }

    function clickInbox() {
        ctrl.sentActive = false;
        ctrl.inboxActive = true;
        ctrl.pendingItems = ctrl.inboxPending;
        ctrl.feedItems = ctrl.inboxItems;
    }

    function showPending() {
        return !!(ctrl.weHavePendingItems() && !ctrl.showSent());
    }

    function getActivityTypeDisplayString(item) {
        var sent = function () {
            return item.from_user_id == ctrl.user.id;
        }();
        var received = function () {
            return item.to_user_id == ctrl.user.id
        }();
        var type = function (type) {
            return item.type == type
        };
        var status = function (status) {
            return item.status == status
        };

        if (type('question')) {
            if (sent && status('reminder')) {
                return 'You sent a reminder';
            }

            if (sent) {
                return 'You sent a question';
            }

            if (status('reminder')) {
                if (received) {
                    return "Sent a reminder to you";
                }

                return "Sent a reminder";
            }

            if (received) {
                return 'Asked you a question';
            }

            return 'Sent a question';
        }

        if (type('answer')) {

            if (sent) {
                return "You answered";
            }

            if (received) {
                return "Answered your question";
            }

            return "Answered";
        }

        if (type('comment')) {

            if (sent) {
                return "You commented";
            }

            if (received) {
                return "Commented on your answer";
            }

            return "Commented";
        }
    }

    function activate() {
        if (!AuthService.loggedIn()) {
            $state.go('root.login');
        }

        $q.all([
            ActivityService.pendingCounts().then(function (data) {
                ctrl.inboxPendingCount = data.inboxPendingCount;
                ctrl.sentPendingCount = data.sentPendingCount;
            }),
            ActivityService.getInboxPending().then(function (data) {
                ctrl.inboxPending = data;
                ctrl.pendingItems = ctrl.inboxPending;
            }),
            ActivityService.getInbox().then(function (data) {
                ctrl.inboxItems = ctrl.getItemsGroupedByDay(data);
                ctrl.feedItems = ctrl.inboxItems;
            }),
        ]).then(function () {
            ActivityService.getSentPending().then(function (data) {
                ctrl.sentPendingItems = data;
            });

            ActivityService.getSent().then(function (data) {
                ctrl.sentItems = ctrl.getItemsGroupedByDay(data);
            });
        });
    }
}

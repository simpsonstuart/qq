angular.module('QQ')
    .controller('DealFeedController', DealFeedController);

function DealFeedController(DealService, DateAndTimeService,$stateParams) {
    var ctrl = this;
    var types = [];

    ctrl.toggle = toggle;
    ctrl.checkExpansion = checkExpansion;
    ctrl.questionsForPlay = questionsForPlay;
    ctrl.formatAnswer = formatAnswer;
    ctrl.formatDate = formatDate;

    activate();


    function questionsForPlay(playbook, parentPlay, childPlay) {
        return objectGet(ctrl.feedDetail, [playbook, parentPlay, childPlay]);
    }

    function toggle(category, type) {
        var key = category + '-' + type;
        if (types[key] === undefined) {
            types[key] = true;
        }

        types[key] = !types[key];
    }

    function checkExpansion(category, type) {
        var key = category + '-' + type;

        if (types[key] === undefined) {
            types[key] = false;
        }

        return types[key];
    }



    function objectGet(obj, properties) {

        if (obj === undefined || obj === null) {
            return;
        }

        if (properties.length === 0) {
            return obj;
        }

        var foundSoFar = obj[properties[0]];
        var remainingProperties = properties.slice(1);

        return objectGet(foundSoFar, remainingProperties);
    }

    function formatAnswer(answer) {
        if (answer) {
            return 'replied ' + answer;
        }

        return 'No Reply'
    }

    function formatDate(date, format) {
        if (!date) {
            return null;
        }

        if (format) {
            return DateAndTimeService.formatDate(date).format(format);
        }
        return DateAndTimeService.formatDate(date).format("MMM D");
    }

    function activate() {
        ctrl.deal_id = $stateParams.deal_id;

        DealService.get(ctrl.deal_id).then(function (data) {
            ctrl.deal = data;
        });

        DealService.feed($stateParams.deal_id).then(function (data) {
            ctrl.feed = data;
        }).then(function (data) {
            DealService.feedDetail($stateParams.deal_id).then(function (data) {
                ctrl.feedDetail = data;
            });
        });
    }
}

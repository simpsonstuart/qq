angular.module('QQ')
    .controller('DistrictController', DistrictController);

function DistrictController($scope, UserService, NumberService, DateAndTimeService, $stateParams) {
    var ctrl = this;

    ctrl.convertNumberToWord = NumberService.numberToWord;
    ctrl.currentQuarter = DateAndTimeService.currentQuarter;
    ctrl.trailingAnswerCount = trailingAnswerCount;
    ctrl.trailingQuestionCount = trailingQuestionCount;
    ctrl.weekCounts = weekCounts;

    activate();

    function trailingAnswerCount(user) {
        return user.trailing_counts.questions_and_answers[0].answer_count;
    }

    function trailingQuestionCount(user) {
        return user.trailing_counts.questions_and_answers[0].question_count;
    }

    function weekCounts(user) {
        return user.trailing_counts.week_counts;
    }

    function activate() {
        if ($stateParams.user_id) {
            UserService.get($stateParams.user_id).then(function (data) {
                ctrl.districtForLabel = data.name;
                ctrl.showReportlabel = 'true';
            });
        } else {
            ctrl.districtMyLabel = 'My ';
            ctrl.showReportlabel = 'false';
        }

        UserService.getAll(function () {
            if ($stateParams.user_id) {
                return 'manager=' + $stateParams.user_id;
            }
            return null
        }()).then(function (data) {
            ctrl.district = data;
        });
    }
}

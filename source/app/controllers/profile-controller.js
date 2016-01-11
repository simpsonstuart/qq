angular.module('QQ')
    .controller('ProfileController', ProfileController);

function ProfileController($scope, $state, $stateParams, UserService, NumberService, DateAndTimeService) {
    var ctrl = this;
    var user_id = $stateParams.user_id;

    ctrl.convertNumberToWord = NumberService.numberToWord;
    ctrl.formatMoney = NumberService.formatMoney;
    ctrl.currentQuarter = DateAndTimeService.currentQuarter;
    ctrl.showSettings = showSettings();

    ctrl.answerCountIsZero = answerCountIsZero;
    ctrl.isRole = isRole;
    ctrl.setProfileForName = setProfileForName;
    ctrl.goToDistrict = goToDistrict;

    UserService.profile(function () {
        return user_id ? user_id : 'current';
    }()).then(function (data) {
        ctrl.profile = data;
        ctrl.trailingCounts = ctrl.profile.trailing_counts;
        ctrl.quarterAnswerCount = ctrl.trailingCounts.questions_and_answers[0].answer_count;
        ctrl.quarterQuestionCount = ctrl.trailingCounts.questions_and_answers[0].question_count;
        ctrl.playbook_counts = ctrl.profile.playbook_counts.data;
        ctrl.virtual_team = ctrl.profile.virtual_team.data;
        ctrl.isManager = ctrl.isRole('manager');
        ctrl.roleLabel = ctrl.profile.role.data.label;
        ctrl.setProfileForName();
        //if its my profile load my deals otherwise load the other persons deals
        if($state.is('root.profile')){
            ctrl.MyDeals = true;
        } else {
            ctrl.MyDeals = false;
        }
    });

    function answerCountIsZero(team_mate) {
        if (team_mate.answer_count == 0) {
            return 'zero'
        }

        return '';
    }

    function showSettings() {
        return !$stateParams.user_id;
    }

    function isRole(user_role) {
        return ctrl.profile.role.data.name == user_role
    }

    function setProfileForName() {
        if (user_id) {
            ctrl.profileForName = "Profile of " + ctrl.profile.name;
            ctrl.not_other_profile = false;
        } else {
            ctrl.profileForName = "My Profile";
            ctrl.not_other_profile = true;
        }
    }

    function goToDistrict() {
        if (user_id) {
            $state.go('root.district.user', {user_id: user_id});
        } else {
            $state.go('root.district');
        }
    }
}

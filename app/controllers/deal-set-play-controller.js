angular.module('QQ')
    .controller('DealSetPlayController', DealSetPlayController);

function DealSetPlayController($scope, $stateParams, DealService, _) {
    var ctrl = this;

    ctrl.deal_id = $stateParams.deal_id;
    ctrl.selectedPlayInPlaybook = [];
    ctrl.selected = null;

    ctrl.activePlays = activePlays;
    ctrl.allPlays = allPlays;
    ctrl.addPlay = addPlay;
    ctrl.setSelected = setSelected;

    DealService.get($stateParams.deal_id).then(function (data) {
        ctrl.deal = data;
        ctrl.deal_name = data.name;
        ctrl.company = data.company_name
    });

    DealService.playbooks($stateParams.deal_id).then(function (data) {
        ctrl.playbooks = data;
    });

    function activePlays(plays) {
        return _.filter(plays, function (play) {
            if (parseInt(play.active)) {
                play.active = 1;
                return play;
            }
        });
    }

    function allPlays(plays) {
        return _.filter(plays, function (play) {
            if (parseInt(play.active) === 0) {
                play.active = 0;
                return play;
            }
        });
    }

    function addPlay(playbook_name) {
        var playId = ctrl.selectedPlayInPlaybook[playbook_name];
        var play = _.findWhere(ctrl.playbooks[playbook_name].plays, {id: playId});
        play.active = 1;
        DealService.addPlay(ctrl.deal_id, [playId]).then(function (data) {
            console.log(data);
        });
    }

    function setSelected(playbook_name) {
        ctrl.selectedPlayInPlaybook[playbook_name] = ctrl.selected;
    }
}

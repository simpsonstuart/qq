angular.module('QQ')
    .controller('ImportDealsController', ImportDealsController);

function ImportDealsController($scope, $state, DealService) {
    var ctrl = this;

    //fictional deals replace with real ones in future

    DealService.importList().then(function (data) {
        ctrl.deals = data;
    });

    //gets selected users on finish click then goes to profile page
    ctrl.nextPressed = function () {
        ctrl.getChecked();
        var dealsToImport = _.pluck(ctrl.dealsChecked, 'id');
        DealService.add(dealsToImport);
        //todo add logic that does something with selected deals here
        $state.go('root.import-users');

    };

    //Get checked deals by looking at is checked property added to array by angular
    ctrl.getChecked = function () {
           ctrl.dealsChecked = _.filter(ctrl.deals, "isChecked");
    };

    //check if at least one deal is checked and set state of finish button
    ctrl.checkEnabled = function() {
        ctrl.getChecked();
        if(_.some(ctrl.dealsChecked, 'isChecked')) {
            ctrl.isDisabled = false;
        }
        else {
            ctrl.isDisabled = true;
        }
    };
}

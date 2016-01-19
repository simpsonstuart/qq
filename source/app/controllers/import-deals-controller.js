angular.module('QQ')
    .controller('ImportDealsController', ImportDealsController);

function ImportDealsController($scope, $state) {
    var ctrl = this;

    //fictional deals replace with real ones in future
    ctrl.deals = [
        {"name":"Asus LCD Factory Upgrade", "owner":"Travis Jones", "closeDate":"1/17/2015", "amount":"$520K", "dealId":"4564"},
        {"name":"LG Chemical PLC Retrofit", "owner":"Dawn Anderson", "closeDate":"2/23/2015", "amount":"$350K", "dealId":"6748"},
        {"name":"Motorola Mobility Plant Upgrade", "owner":"David Hewitt", "closeDate":"1/19/2015", "amount":"$900K", "dealId":"4746"},
        {"name":"Cloud Electro Server Upgrade", "owner":"Jackson Davis", "closeDate":"4/3/2015", "amount":"$830K", "dealId":"35344"}
    ];
    //gets selected users on finish click then goes to profile page
    ctrl.nextPressed = function () {
        ctrl.getChecked();
        console.log(ctrl.dealsChecked);
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

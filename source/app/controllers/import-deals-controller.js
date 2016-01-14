angular.module('QQ')
    .controller('ImportDealsController', ImportDealsController);

function ImportDealsController($scope, $state) {
    var ctrl = this;

    //fictional deals
    ctrl.deals = [
        {"name":"Asus LCD Factory Upgrade", "owner":"Travis Jones", "closeDate":"1/17/2015", "amount":"$520K", "dealId":"4564"},
        {"name":"LG Chemical PLC Retrofit", "owner":"Dawn Anderson", "closeDate":"2/23/2015", "amount":"$350K", "dealId":"6748"},
        {"name":"Motorola Mobility Plant Upgrade", "owner":"David Hewitt", "closeDate":"1/19/2015", "amount":"$900K", "dealId":"4746"},
        {"name":"Cloud Electro Server Upgrade", "owner":"Jackson Davis", "closeDate":"4/3/2015", "amount":"$830K", "dealId":"35344"}
    ];
    //returns array of only selected users on finish click then goes to profile page
    ctrl.getChecked = function () {
        var dealsChkd = [];
        for (var i = 0, l = ctrl.deals.length; i < l; i++) {
            if (ctrl.deals[i].isChecked) {
                dealsChkd.push(angular.copy(ctrl.deals[i]));
                delete dealsChkd[i].isChecked;
            }
        }
        console.log(dealsChkd);
        $state.go('root.import-users');
    };
}

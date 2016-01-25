angular.module('QQ')
    .controller('ImportDealsController', ImportDealsController);

function ImportDealsController($scope, $state, DealService) {
    var ctrl = this;
    ctrl.submit = submit;
    ctrl.submittable = submittable;

    DealService.importList().then(function (data) {
        ctrl.deals = data;
    });

    function submit() {
        var dealsToImport = _.pluck(checked(), 'id');
        DealService.add(dealsToImport).then(function (response) {
            console.log(response);
            $state.go('root.import-users');
        });
    }

    function submittable() {
       return !_.some(checked(), 'isChecked');
    }

    function checked() {
        return _.filter(ctrl.deals, "isChecked");
    }
}

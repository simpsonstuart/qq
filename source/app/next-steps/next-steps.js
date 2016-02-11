(function () {
    'use strict';
    angular.module('app.next-steps').controller('NextSteps',NextSteps);

    function NextSteps(DealService, $scope, $location, NumberService, _) {
        var ctrl = this;
        ctrl.filterNextSteps = filterNextSteps;
        ctrl.formatMoney = NumberService.formatMoney;
        ctrl.filterActive = false;

        activate();

        function activate() {
            DealService.getAll('include=owner').then(function (data) {
                ctrl.deals = data;
            });
        }

        //filters deals based on if they have next steps or not filtering for other types happens in angular
        ctrl.filteredDeals = _.filter(ctrl.deals, "next_step");

        if(ctrl.filteredDeals.length < 1) {

            ctrl.showNoDealsWithoutNextSteps = true;
        }

        function filterNextSteps(){
            ctrl.filterActive= !ctrl.filterActive;
            if(ctrl.filterActive){

                ctrl.filteredDeals  = _.reject(ctrl.deals, "next_step");
                ctrl.noNextStep = true;
                ctrl.showNoDealsWithoutNextSteps = false;
            }
            else{

                ctrl.filteredDeals = _.filter(ctrl.deals, "next_step");
                ctrl.noNextStep = false;
                if(ctrl.filteredDeals.length < 1) {

                    ctrl.showNoDealsWithoutNextSteps = true;
                }
            }
        }
    }
})();

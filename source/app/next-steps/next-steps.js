(function () {
    'use strict';
    angular.module('app.next-steps').controller('NextSteps',NextSteps);
    NextSteps.$inject = ['DealService', 'NumberService', '_', '$stateParams'];

    function NextSteps(DealService, NumberService, _, $stateParams) {
        var ctrl = this;
        ctrl.filterNextSteps = filterNextSteps;
        ctrl.formatMoney = NumberService.formatMoney;
        ctrl.selectedSort = 'close_date';
        ctrl.loading = false;

        _activate();

        function filterNextSteps(){
            ctrl.filterActive= !ctrl.filterActive;
            if(ctrl.filterActive){
                ctrl.filteredDeals  = _.reject(ctrl.deals, 'next_step');
                ctrl.noNextStep = true;
                ctrl.showNoDealsWithoutNextSteps = false;
            } else {
                ctrl.filteredDeals = _.filter(ctrl.deals, _hasNextStepFilter);
                ctrl.noNextStep = false;

                if(ctrl.filteredDeals.length < 1) {
                    ctrl.showNoDealsWithoutNextSteps = true;
                }
            }
        }

        function _activate() {
            window.scrollTo(0, 0);
            ctrl.loading = true;
            DealService.getAll('include=owner').then(function (data) {
                ctrl.loading = false;
                ctrl.deals = data;
                angular.forEach(ctrl.deals, function (deal) {
                    deal.amount = parseFloat(deal.amount);
                });
                if ($stateParams.nextStepState === 'false') {
                    ctrl.filterActive = true;
                    ctrl.filteredDeals  = _.reject(ctrl.deals, 'next_step');
                    ctrl.noNextStep = true;
                } else {
                    ctrl.filterActive = false;
                    //filters deals based on if they have next steps or not filtering for other types happens in angular
                    ctrl.filteredDeals = _.filter(ctrl.deals, _hasNextStepFilter);
                    if(ctrl.filteredDeals.length < 1) {
                        ctrl.showNoDealsWithoutNextSteps = true;
                    }
                }

            });
        }

        function _hasNextStepFilter (deal) {
            if (deal.next_step == null) {
                return false;
            }
            return !!deal.next_step.trim();
        }




    }
})();

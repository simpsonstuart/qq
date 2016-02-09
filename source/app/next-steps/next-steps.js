(function () {
    'use strict';
    angular.module('app.next-steps').controller('NextSteps',NextSteps);

    function NextSteps($scope, $location, NumberService, _) {
        var ctrl = this;
        ctrl.filterNextSteps = filterNextSteps;
        ctrl.formatMoney = NumberService.formatMoney;
        ctrl.filterActive = false;

        //fictional deals
        ctrl.deals = [
            {"name":"Asus LCD Factory Upgrade", "owner":"Travis Jones", "close_date":"1/17/2015", "account_value":"52000", "id":"4564", "next_step":"Visit customer to check on deal status to verify that we have funding for everything."},
            {"name":"LG Chemical PLC Retrofit", "owner":"Dawn Anderson", "close_date":"2/23/2016", "account_value":"65000", "id":"6748", "next_step":"Contact LG Chemical lead to begin talks and planning"},
            {"name":"Motorola Mobility Plant Upgrade", "owner":"David Hewitt", "close_date":"1/19/2015", "account_value":"90000", "id":"4746", "next_step":"Start ordering materials so it can go to production."},
            {"name":"Cloud Electro Server Upgrade", "owner":"Jackson Davis", "close_date":"4/3/2015", "account_value":"83000", "id":"35344", "next_step":""},
            {"name":"IZZE Marketing Deployment", "owner":"Sarah Borellis", "close_date":"4/3/2016", "account_value":"54320", "id":"35149", "next_step":"Meet to decide when to go live with new promo materials."}
        ];

        //filters deals based on if they have next steps or not filtering for other types happens in angular
        ctrl.filteredDeals = _.filter(ctrl.deals, "next_step");

        function filterNextSteps(){
            ctrl.filterActive= !ctrl.filterActive;
            if(ctrl.filterActive){

                ctrl.filteredDeals  = ctrl.deals.filter(function(deal) {
                    return !deal.next_step;
                });
            }
            else{

                ctrl.filteredDeals = _.filter(ctrl.deals, "next_step");
            }
        }
    }
})();

(function () {
    'use strict';

    angular.module('app.common').directive('months', LoadingDirective);

    function LoadingDirective() {
        return {
            restrict: 'E',
            template: '<select class="fiscalYearSelect" ng-model="selected" ng-options="month for month in months"> ng-required="true"></select>',
            scope: {
                show: '=',
                months: "=",
                selected: "="
            },
            link: function (scope, element, attrs) {
            }
        };
    }

})();

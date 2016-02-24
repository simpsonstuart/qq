(function () {
    'use strict';

    angular.module('app.common').directive('loading', LoadingDirective);

    function LoadingDirective() {
        return {
            restrict: 'E',
            template: '<div class="sync-header"><h1>{{message}}</h1><img src="/media/images/syncing.gif"></div>',
            scope: {
                show: '='
            },
            link: function (scope, element, attrs) {
                if (attrs.message) {
                    scope.message = attrs.message;
                } else {
                    scope.message = "Loading…"
                }
            }
        };
    }

})();

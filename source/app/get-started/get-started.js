(function () {
    'use strict';
    angular.module('app.get-started')
        .controller('GetStarted', GetStarted);

    function GetStarted($scope, $state) {
        var ctrl = this;
        ctrl.getStarted = getStarted;

        if ($state.params.token) {
            ctrl.showGetStarted = true;
        }

        function getStarted() {
            $state.go('login', {token: $state.params.token});
        }

    }
})();

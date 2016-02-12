(function () {
    'use strict';
    angular.module('app.get-started')
        .controller('GetStarted', GetStarted);

    function GetStarted($scope, $state) {
        var ctrl = this;
        ctrl.getStarted = getStarted;
        console.log($state.params.token);

        function getStarted() {
            $state.go('link-with-salesforce', {register_key: "03434324"});
        }

    }
})();

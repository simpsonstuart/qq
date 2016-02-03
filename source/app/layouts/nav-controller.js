(function () {
    'use strict';
    angular.module('app')
        .controller('NavController', NavController);

    function NavController($scope, $location) {
        $scope.isActive = isActive;

        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }
    }

})();

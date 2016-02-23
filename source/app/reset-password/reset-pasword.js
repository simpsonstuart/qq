(function () {
    'use strict';
    angular.module('app.reset-password')
        .controller('ResetPassword', ResetPassword);

    function ResetPassword($scope, $state, UserService) {
        var ctrl = this;
        ctrl.save = save;
        ctrl.token = null;
        ctrl.saving = false;

        _activate();

        function save() {
            UserService.resetPassword(ctrl.token, $scope.pw2).then(function(){
                $state.go('login', {reset_success: true});
            }, function () {
                $state.go('login', {reset_fail: true});
            });
        }

        function _activate() {
           ctrl.token = $state.params.token;
        }
    }
})();

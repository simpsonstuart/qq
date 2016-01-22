angular.module('QQ')
    .controller('RegistrationController', RegistrationController);

function RegistrationController($scope, $state, UserService) {
    var ctrl = this;
    ctrl.register = register;

    function register() {
        UserService.register((function () {
            return { 'email': $scope.email, 'username': $scope.username, 'password': $scope.confirm_password };
        })()).then(function(){
            $state.go('root.login');
        });
    }
}



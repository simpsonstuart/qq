angular.module('QQ')
    .controller('ImportUsersController', ImportUsersController);

function ImportUsersController($scope, _, $state, UserService) {
    var ctrl = this;
    ctrl.submit = submit;
    ctrl.noUsersToImport = noUsersToImport;
    ctrl.users = [];
    ctrl.usersRetrieved = false;

    UserService.importList().then(function (data) {
        ctrl.users = data;
        ctrl.usersRetrieved = true;
    });

    function submit () {
        var usersToImport = _.pluck(_.filter(ctrl.users, "isChecked"), 'id');
        if (usersToImport.length > 0) {
            UserService.add(usersToImport).then(function (response) {
                $state.go('root.profile');
            });
        } else {
            $state.go('root.profile');
        }
    }

    function noUsersToImport() {
        return ctrl.users.length < 1 && ctrl.usersRetrieved;
    }
}

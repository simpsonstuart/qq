angular.module('QQ')
    .controller('ImportUsersController', ImportUsersController);

function ImportUsersController($scope, _, $state, UserService) {
    var ctrl = this;
    ctrl.submit = submit;
    ctrl.submittable = submittable;

    UserService.importList().then(function (data) {
        ctrl.users = data;
    });

    function submit () {
        var usersToImport = _.pluck(_.filter(ctrl.users, "isChecked"), 'id');
        console.log(usersToImport);
        UserService.add(usersToImport).then(function (response) {
            $state.go('root.profile');
        });
    }

    function submittable () {
        return !_.some(ctrl.users, 'isChecked');
    }
}

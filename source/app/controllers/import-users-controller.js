angular.module('QQ')
    .controller('ImportUsersController', ImportUsersController);

function ImportUsersController($scope, _, $state) {
    var ctrl = this;
    ctrl.users = [
        {"name":"Elizabeth Hudlet", "role": '', "manager":"David Thompson", "avatar":"/media/images/avatar3.png", "userId":"938253"},
        {"name":"Tonya Williams", "role": '',"manager":"Rick Sanders", "avatar":"media/images/avatar.png", "userId":"454845"},
        {"name":"Pablo Montoya", "role": '',"manager":"Nathanial Patlovich", "avatar":"/media/images/avatar2.png", "userId":"394985"}
    ];

    ctrl.roles =["Admin", "Manager", "Rep"];
    ctrl.letterLimit = 1;

    //returns index for user then sets the user role based on button pressed
    ctrl.clickedRole = function(userId, role){
    var userIndex = _.findIndex(ctrl.users, "userId", userId);
    ctrl.users[userIndex].role= role;
    };

    //returns array of only selected users on finish click then goes to profile page
    ctrl.getChecked = function () {
        var usersChkd = [];
        for (var i = 0, l = ctrl.users.length; i < l; i++) {
            if (ctrl.users[i].isChecked) {
                usersChkd.push(angular.copy(ctrl.users[i]));
                delete usersChkd[i].isChecked;
            }
        }
        ctrl.usersChkd = usersChkd;
        $state.go('root.profile');
    };
}

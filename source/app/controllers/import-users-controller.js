angular.module('QQ')
    .controller('ImportUsersController', ImportUsersController);

function ImportUsersController($scope, _, $state) {
    var ctrl = this;
    ctrl.users = [
        {"name":"Elizabeth Hudlet", "manager":"David Thompson", "avatar":"/media/images/avatar3.png", "userId":"938253"},
        {"name":"Tonya Williams", "manager":"Rick Sanders", "avatar":"media/images/avatar.png", "userId":"454845"},
        {"name":"Pablo Montoya", "manager":"Nathanial Patlovich", "avatar":"/media/images/avatar2.png", "userId":"394985"}
    ];

    ctrl.roles =["Admin", "Manager", "Rep"];
    ctrl.letterLimit = 1;

    //returns index for user then sets the user role in array based on button pressed
    ctrl.clickedRole = function(userId, role){
    var userIndex = _.findIndex(ctrl.users, "userId", userId);
    ctrl.users[userIndex].role= role;
    ctrl.validate(userIndex);
    };

    //returns array of only selected users on finish click then goes to profile page
    ctrl.finishPressed = function () {
        //todo add logic that does something with selected users here
        $state.go('root.profile');
    };

    //when user check is toggled rest selected role and add call validation
    ctrl.checkEnabled = function(userId) {
        //reset role if already set to enable toggle
        var userIndex = _.findIndex(ctrl.users, "userId", userId);
            ctrl.users[userIndex].role = "";

            // filter array for users that are selected
            ctrl.filteredUsers = _.filter(ctrl.users, "isChecked");
            ctrl.validate(userIndex);
    };

    //disable the finish button if no users are checked and if a role isn't selected for all selected users
    ctrl.validate = function(userIndex) {

        if (_.some(ctrl.users, 'isChecked') && _.every(ctrl.filteredUsers, 'role')){

            ctrl.isDisabled = false;
        }
        else{
            ctrl.isDisabled = true;
        }
    };
}

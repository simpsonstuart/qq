angular.module('QQ')
    .controller('MainController', MainController);

function MainController($scope, QuestionsModel) {
    $scope.test = 'hello';

    //$scope.questions = QuestionsModel.getQuestions()
    //    // success handler of $http
    //    .then(function (result) {
    //    });

    $scope.myReps = [];


    $scope.allReps = [{'name': 'Claire Miller'}, {'name': 'Christopher Walken'}, {'name': 'Dustin Jones'}, {'name': 'Elizabeth Samuels'}, {'name': 'Samuel L Jackson'}, {'name': 'Matt Neally'}];

    $scope.search = {
        name: ''
    };

    $scope.addRep = function (repName) {
        $scope.myReps.push({'name': repName});
        $scope.visible = !$scope.visible;
    };

    $scope.removeMyRep = function (index, repName) {
        $scope.myReps.splice(index, 1);
        $scope.allReps.push({'name': repName});
    };

    $scope.removeAllRep = function (index) {
        $scope.allReps.splice(index, 1);
    };

    $scope.showRepList = function () {
        $scope.visible = !$scope.visible;
    };

    $scope.showPermissions = function () {
        $scope.visible = !$scope.visible;
    };

    $scope.setPermissions = function () {
        !$scope('div.permissions').visible;
    };
}

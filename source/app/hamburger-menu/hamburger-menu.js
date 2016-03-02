(function () {
    'use strict';
    angular.module('app.hamburger-menu')
        .controller('hamburgerMenu', hamburgerMenu);
    hamburgerMenu.$inject = ['$state', 'AuthService'];

    function hamburgerMenu($state, AuthService) {
        var ctrl = this;
        ctrl.logOut = logOut;
        ctrl.clicked = clicked;
        ctrl.MenuClicked = false;

        function logOut() {
            AuthService.logOut();

            $state.go('login');
        }

        function clicked (){
            console.log('clicked');
            ctrl.MenuClicked = ! ctrl.MenuClicked;
        }
    }
})();

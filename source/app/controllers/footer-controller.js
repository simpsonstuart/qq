angular.module('QQ')
    .controller('FooterController', FooterController);

function FooterController($scope, $state) {
    var ctrl = this;
    //highlight the feed tab only by default
    if($state.is('root.feed')){
        ctrl.FeedActive = true;
        ctrl.DealsActive = false;
        ctrl.NSActive = false;
        ctrl.ProfileActive =false;
    }else if ($state.is('root.deals')){
        ctrl.FeedActive = false;
        ctrl.DealsActive = true;
        ctrl.NSActive = false;
        ctrl.ProfileActive =false;
    }else if ($state.is('root.coming-soon')){
        ctrl.FeedActive = false;
        ctrl.DealsActive = false;
        ctrl.NSActive = true;
        ctrl.ProfileActive =false;
        var redrawNS = document.getElementById('footer-NS');
    }else if ($state.is('root.profile')){
        ctrl.FeedActive = false;
        ctrl.DealsActive = false;
        ctrl.NSActive = false;
        ctrl.ProfileActive =true;
    }
}

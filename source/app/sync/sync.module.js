(function () {
    'use strict';
    angular.module('app.sync', []);

    angular.module('app.sync').run(run);


    function run(CacheFactory, $rootScope, UserService) {

        $rootScope.$on('$stateChangeStart', stateChangeStart);

        function stateChangeStart(event, next) {
            if (next.name == 'sync') {
                CacheFactory.clearAll();
                $rootScope.$broadcast('Synced');
            }
        }
    }
})();

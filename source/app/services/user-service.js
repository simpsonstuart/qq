(function () {
    'use strict';
    angular.module('app')
        .factory('UserService', UserService);

    function UserService(ApiService) {
        var savedSyncCount = 0;

        return {
            getAll:                  getAll,
            getPending:              getPending,
            profile:                 profile,
            get:                     get,
            register:                register,
            changePassword:          changePassword,
            changeEmail:             changeEmail,
            resendVerificationEmail: resendVerificationEmail,
            verify:                  verify,
            resetPassword:           resetPassword,
            sendPasswordReset:       sendPasswordReset,
            syncCount:               syncCount,
            getSyncCount:            getSyncCount,
            setSyncCount:            setSyncCount,
            changeFiscalYear:        changeFiscalYear
        };

        function getAll(query) {
            return ApiService.get('users', query);
        }

        function getPending() {
            return ApiService.get('users', 'filter=pending');
        }

        function profile(user_id, bustCache) {
            return ApiService.get('users/' + user_id, 'include=active_deals_amount,next_steps_count,deals_without_next_steps_count,last_deal_import_amount', undefined, undefined, bustCache);
        }

        function get(user_id) {
            return  ApiService.get('users/' + user_id);
        }

        function register(registration_data){
            return ApiService.post('registration', registration_data);
        }

        function changePassword(userId, reset_password_data) {
            return ApiService.post('users/' + userId + '/password', reset_password_data);
        }

        function sendPasswordReset(email, returnUrl) {
            return ApiService.post('password/reset/send', {email: email, return_url: returnUrl});
        }

        function getSyncCount() {
            return savedSyncCount;
        }

        function setSyncCount(count) {
            savedSyncCount = count;
        }

        function syncCount(bustCache) {
            return ApiService.get('sync/count', null, null, null, bustCache);
        }

        /**
         * @param {string} token
         * @param {string} password
         * @returns {Promise}
         */
        function resetPassword(token, password) {
            return ApiService.post('password/reset', {token: token, password: password});
        }

        function changeEmail(userId, email_data) {
            return ApiService.post('users/' + userId + '/email', email_data);
        }

        function resendVerificationEmail(email, returnUrl) {
            return ApiService.post('users/verification', {'email': email, 'return_url': returnUrl});
        }

        function verify(token) {
           return ApiService.post('users/verify/' + token);
        }

        function changeFiscalYear(fiscalYearStartMonth) {
            return ApiService.post('users/current/fiscal-year', {fiscal_year_start_month: fiscalYearStartMonth});
        }
    }
})();

(function () {
    'use strict';
    angular.module('app')
        .factory('UserService', UserService);

    function UserService(ApiService) {

        return {
            getAll:                  getAll,
            getPending:              getPending,
            profile:                 profile,
            get:                     get,
            register:                register,
            changePassword:          changePassword,
            changeEmail:             changeEmail,
            billing_change:          billing_change,
            resendVerificationEmail: resendVerificationEmail,
            verify:                  verify
        };

        function getAll(query) {
            return ApiService.get('users', query);
        }

        function getPending() {
            return ApiService.get('users', 'filter=pending');
        }

        function profile(user_id) {
            return ApiService.get('users/' + user_id, 'include=active_deals_amount,next_steps_count,deals_without_next_steps_count,last_deal_import_amount');
        }

        function get(user_id) {
            return  ApiService.get('users/' + user_id);
        }

        function register(registration_data){
            return ApiService.post('registration', registration_data);
        }

        function changePassword(userId, reset_password_data){
            return ApiService.post('users/' + userId + '/password', reset_password_data);
        }

        function changeEmail(userId, email_data) {
            return ApiService.post('users/' + userId + '/email', email_data);
        }

        function billing_change(billing_data) {
            return ApiService.post('settings', billing_data);
        }

        function resendVerificationEmail(email, returnUrl) {
            return ApiService.post('users/verification', {'email': email, 'return_url': returnUrl});
        }

        function verify(token) {
           return ApiService.post('users/verify/' + token);
        }
    }
})();

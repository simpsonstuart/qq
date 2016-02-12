(function () {
    'use strict';
    angular.module('app')
        .factory('UserService', UserService);

    function UserService(ApiService) {

        return {
            getAll: getAll,
            getPending: getPending,
            profile: profile,
            get: get,
            register: register,
            reset_password: reset_password,
            email_change: email_change,
            billing_change: billing_change,
            resendVerificationEmail: resendVerificationEmail
        };

        function getAll(query) {
            return ApiService.get('users', query);
        }

        function getPending() {
            return ApiService.get('users', 'filter=pending');
        }

        function profile(user_id) {
            return ApiService.get('users/' + user_id, 'include=active_deals_amount,incomplete_next_steps');
        }

        function get(user_id) {
            return  ApiService.get('users/' + user_id);
        }

        function register(registration_data){
            return ApiService.post('registration', registration_data);
        }

        function reset_password(reset_password_data){
            return ApiService.post('settings', reset_password_data);
        }

        function email_change(email_data) {
            return ApiService.post('settings', email_data);
        }

        function billing_change(billing_data) {
            return ApiService.post('settings', billing_data);
        }

        function resendVerificationEmail(email) {
            return ApiService.post('users/verification', {'email': email});
        }

        function verify(token) {
           return ApiService.post('users/verify/' + token);
        }
    }
})();

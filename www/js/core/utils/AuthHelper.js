/**
 * Singleton used to manage the user authentication.
 * @param {ApiHelper} api
 */
define([
], function () {

    'use strict';

    var AuthHelper = function (api) {

        var that = this;
        this.loggedIn = false;

        /**
         * Log the user
         * @param  {String}   username
         * @param  {String}   password
         * @param  {Function} callback Called with a boolean (true = auth success)
         */
        this.login = function(username, password, callback) {

            var that = this;

            callback = callback || function() {};

            api.post('/login', {
                data: {
                    username: username,
                    password: password,
                },
                success: function(token) {
                    that.loggedIn = true;
                    that.setToken(token);
                    callback(true);
                },
                error: function() {
                    that.loggedIn = false;
                    callback(false);
                },
            });
        };

        this.logout = function(callback) {

            var that = this;

            api.post('/logout', {
                success: function() {
                    that.loggedIn = false;
                    that.clearToken();
                    callback(true);
                },
                error: function() {
                    console.error('Logout error.');
                    callback(false);
                }
            });
        };

        // Set the token in the localStorage
        this.setToken = function(token) {
            localStorage.token = token;
            this.token = token;
            api.setToken(token);
        };

        this.clearToken = function() {
            this.setToken(null);
        };

        /**
         * Check if the token can authenticate the user
         * @param  {Function} callback A boolean is passed (true = loggedIn)
         */
        this.checkLogin = function(callback) {
            callback = callback || function() {};

            // No authentication without token
            if (!this.token) {
                callback(false);
                return;
            }

            api.get('/logged-in', {
                success: function() {
                    that.loggedIn = true;
                    callback(true);
                },
                error: function() {
                    that.loggedIn = false;
                    callback(false);
                },
            });
        };

        // Load the token from the localStorage
        this.setToken(localStorage.token);
    };

    return AuthHelper;
});

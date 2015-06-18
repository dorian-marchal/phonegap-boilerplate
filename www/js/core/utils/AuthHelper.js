/**
 * Singleton used to manage the user authentication.
 * @param {ApiHelper} api
 */
define([
    'jquery',
], function ($) {

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
                dataType: 'json',
                data: {
                    username: username,
                    password: password,
                },
                success: function(user) {
                    that.loggedIn = true;
                    that.setUser(user);
                    callback(true);
                },
                error: function() {
                    that.loggedIn = false;
                    that.setUser(null);
                    callback(false);
                },
            });
        };

        this.logout = function(callback) {

            var that = this;
            callback = callback || $.noop;

            api.post('/logout', {
                success: function() {
                    that.loggedIn = false;
                    that.clearUser();
                    callback(true);
                },
                error: function() {
                    console.error('Logout error.');
                    callback(false);
                }
            });
        };

        // Set the user in the localStorage
        this.setUser = function(user) {
            if (user && user.token) {
                localStorage.user = JSON.stringify(user);
                api.setToken(user.token);
            }
            else {
                localStorage.user = null;
                api.setToken(null);
            }
            this.user = user;
        };

        this.clearUser = function() {
            this.setUser(null);
        };

        /**
         * Check if the token can authenticate the user
         * @param  {Function} callback A boolean is passed (true = loggedIn)
         */
        this.checkLogin = function(callback) {
            callback = callback || function() {};

            // No authentication without token
            if (!this.user || !this.user.token) {
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

        // Load the user from the localStorage
        var storedUser = localStorage.user;
        this.setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    return AuthHelper;
});

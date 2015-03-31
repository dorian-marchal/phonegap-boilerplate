/**
 * $.ajax wrapper to easily make request to the server API
 * Example :
 *     var api = new ApiHelper('localhost', 8080);
 *     api.get('/mymodels', )
 */
define([
    'jquery',
], function ($) {

    'use strict';

    var ApiHelper = function (serverHost, serverPort) {

        /**
         * Globally add the token to all Ajax requests
         * @param {String} token
         */
        this.setToken = function(token) {

            $.ajaxSetup({
                data: {
                    access_token: token,
                },
            });
        };

        this._ajax = function(method, url, settings) {
            settings = settings || {};

            settings.method = method;
            settings.url = 'http://' + serverHost + ':' + serverPort + url;

            return $.ajax(settings);
        };

        this.get = function() {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('get');
            this._ajax.apply(this, args);
        };

        this.post = function() {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('post');
            this._ajax.apply(this, args);
        };

    };

    return ApiHelper;
});

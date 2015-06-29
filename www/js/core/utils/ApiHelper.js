/**
 * $.ajax wrapper to easily make request to the server API.
 * An instance of ApiHelper is available as `app/singletons/api.js`
 *
 * Example :
 * ```js
 * var api = new ApiHelper('localhost', 8080);
 * api.get('/mymodels', {
 *     success: sucessCallback,
 *     error: errorCallback,
 * });
 * ```
 * @module ApiHelper
 */
define([
    'jquery',
], function ($) {

    'use strict';

    var ApiHelper = function (serverHost, serverPort) {

        /**
         * @return {String} the base api url
         */
        this.getUrl = function () {
            return 'http://' + serverHost + ':' + serverPort;
        };

        /**
         * Globally add the access_token to all Ajax requests
         * @param {String} token
         */
        this.setToken = function(token) {

            var ajaxDataSetup = {};

            if (token) {
                ajaxDataSetup.access_token = token;
            }

            $.ajaxSetup({ data: ajaxDataSetup });
        };

        this._ajax = function(method, url, settings) {
            settings = settings || {};

            settings.method = method;
            settings.url = this.getUrl() + url;

            return $.ajax(settings);
        };

        /**
         * $.ajax (GET) wrapper
         * @param {String} route Your relative route.
         * @param {object} options $.ajax options
         */
        this.get = function() {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('get');
            this._ajax.apply(this, args);
        };

        /**
         * $.ajax (POST) wrapper
         * @param {String} route Your relative route.
         * @param {object} options $.ajax options
         */
        this.post = function() {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('post');
            this._ajax.apply(this, args);
        };

    };

    return ApiHelper;
});

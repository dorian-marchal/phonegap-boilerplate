/**
 * $.ajax wrapper to easily make request to the server API
 * Example :
 *     var api = new ApiHelper('localhost', 8080);
 *     api.get('/mymodels', )
 */
define([
    'config',
    'jquery',
], function (config, $) {

    'use strict';

    var ApiHelper = function (serverHost, serverPort) {

        this._ajax = function(method, url) {
            var args = Array.prototype.slice.call(arguments);
            args = args.slice(2);
            args.unshift('http://' + serverHost + ':' + serverPort + url);
            $[method].apply(this, args);
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

    return new ApiHelper(config.server.host, config.server.port);
});

/**
 * Singleton that contains global app needs, like the configuration or the router
 */
define([
    'app/singletons/conf',
], function (config) {
    'use strict';

    var AppGlobals = function() {

        var that = this;

        // Global conf object
        this.config = config;

        // Global route params
        this.route = {};

        // Set the global app router
        this.setRouter = function(router) {
            that.router = router;
        };

    };

    return new AppGlobals();
});

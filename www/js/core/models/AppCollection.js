/**
 * A base collection.
 * All the app collections must inherit from this.
 * The general code of the collections goes here.
 */
 define([
    'globals',
    'backbone',
], function (globals, Backbone) {
    'use strict';

    /**
     * this.route must be set in the children
     */
    return Backbone.Collection.extend({

        initialize: function() {
            this.url = 'http://' + globals.config.server.host + ':' + globals.config.server.port + this.route;
        },
    });

});

/**
 * A base model.
 * All the app models must inherit from this.
 * The general code of the models goes here.
 */
 define([
    'config',
    'backbone',
], function (config, Backbone) {
    'use strict';

    /**
     * this.route must be set in the children
     */
    return Backbone.Model.extend({

        initialize: function() {
            this.url = 'http://' + config.server.host + ':' + config.server.port + this.route;
        },
    });

});

/**
 * A base view.
 * All the app views must inherit from this.
 * The general code of the views goes here.
 */
 define([
    'globals',
    'jquery',
    'underscore',
    'backbone',
], function (globals, $, _, Backbone) {
    'use strict';

    return Backbone.View.extend({

        /**
         * Bind a subview to an element via a selector.
         */
        assign : function (view, selector) {
            view.setElement(this.$(selector)).render();
        },

        initialize: function () {
            var that = this;

            that.events = that.events || {};

            // Some default events
            $.extend(that.events, {
                'click [data-history]' : function(event) {
                    history.back();
                    event.preventDefault();
                },
                'click [data-route]' : function(event) {
                    globals.router.navigate($(event.currentTarget).attr('data-route'), true);
                    event.preventDefault();
                }
            });

        },

    });

});

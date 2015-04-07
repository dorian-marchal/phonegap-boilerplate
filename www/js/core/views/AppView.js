/**
 * A base view.
 * All the app views must inherit from this.
 * The general code of the views goes here.
 */
 define([
    'jquery',
    'underscore',
    'backbone',
], function ($, _, Backbone) {
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
                'click [data-back]' : function(event) {
                    history.back();
                    event.preventDefault();
                },
                'click [data-route]' : function(event) {
                    location.hash = $(event.currentTarget).attr('data-route');
                    event.preventDefault();
                }
            });

        },

    });

});

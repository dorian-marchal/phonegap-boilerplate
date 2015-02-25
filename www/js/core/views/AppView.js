define([
    'jquery',
    'underscore',
    'backbone',
], function ($, _, Backbone) {
    'use strict';

    return Backbone.View.extend({

        assign : function (view, selector, options) {
            options = options || {};
            view.setElement(this.$(selector)).render(options);
        },

        /**
         * The template named "viewName" will be
         * bound to the view.
         */
        initialize: function () {
            var that = this;

            // Add general views event
            that.events = that.events || {};

            $.extend(that.events, {
                'click [data-back]' : function() {
                    history.back();
                },
                'click [data-route]' : function(event) {
                    location.hash = $(event.target).attr('data-route');
                }
            });

        },

    });

});

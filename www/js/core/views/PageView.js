define([
    'jquery',
    'underscore',
    'backbone',
], function ($, _, Backbone) {
    'use strict';

    return Backbone.View.extend({

        className: 'container',

        /**
         * The template named "viewName" will be
         * bound to the view.
         */
        initialize: function (layout) {
            Backbone.View.prototype.initialize.apply(this);
            var that = this;

            that.layout = layout;

            // Add general layout options
            that.layoutOptions = that.layoutOptions || {};

            that.layout.setOptions(that.layoutOptions);
        },

    });

});

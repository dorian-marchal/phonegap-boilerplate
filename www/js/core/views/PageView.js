define([
    'jquery',
    'underscore',
    'core/views/AppView',
], function ($, _, AppView) {
    'use strict';

    return AppView.extend({

        className: 'container',

        /**
         * The template named "viewName" will be
         * bound to the view.
         */
        initialize: function (options) {
            AppView.prototype.initialize.apply(this);
            var that = this;

            that.layout = options.layout;

            // Add general layout options
            that.layoutOptions = that.layoutOptions || {};

            that.layout.setOptions(that.layoutOptions);
        },

    });

});

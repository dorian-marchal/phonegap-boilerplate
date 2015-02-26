/**
 * The object from wich the app router must inherit.
 */
define([
    'jquery',
    'backbone',
    'core/utils/pageslider',
], function ($, Backbone, PageSlider) {
    'use strict';

    return Backbone.Router.extend({

        initialize: function() {
            this.slider = new PageSlider($('body'));
        },

        /**
         * Load a PageView in the given layout.
         */
        loadPage: function(layout, pageView) {
            pageView.delegateEvents();
            layout.setOptions(pageView.layoutOptions);
            layout.setContentView(pageView);
            this.slider.slidePage(layout.render().$el);
        },

    });

});

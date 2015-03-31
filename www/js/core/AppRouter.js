/**
 * The object from wich the app router must inherit.
 */
define([
    'jquery',
    'backbone',
], function ($, Backbone) {
    'use strict';

    return Backbone.Router.extend({

        setSlider: function(slider) {
            this.slider = slider;
        },

        setController: function(controller) {
            this.controller = controller;
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

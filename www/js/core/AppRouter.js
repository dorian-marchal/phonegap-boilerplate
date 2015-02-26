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
         * Load a PageView.
         */
        loadPage: function(pageView) {
            pageView.delegateEvents();
            pageView.layout.setOptions(pageView.layoutOptions);
            pageView.layout.setContentView(pageView);
            this.slider.slidePage(pageView.layout.render().$el);
        },

    });

});

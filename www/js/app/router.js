define([
    'jquery',
    'backbone',
    'core/utils/pageslider',
], function ($, Backbone, PageSlider) {
    'use strict';

    var slider = new PageSlider($('body'));

    return Backbone.Router.extend({

        routes: {
        },

        loadPage: function(viewLayout, appView, viewLayoutOptions) {
            appView.delegateEvents();
            viewLayout.setOptions(viewLayoutOptions);
            viewLayout.setContentView(appView);
            slider.slidePage(viewLayout.render().$el);
        },

    });

});

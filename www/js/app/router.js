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

        loadPage: function(appView) {
            appView.delegateEvents();
            appView.layout.setOptions(appView.layoutOptions);
            appView.layout.setContentView(appView);
            slider.slidePage(appView.render().$el);
        },

    });

});

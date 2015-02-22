define([
    'jquery',
    'backbone',
    'core/utils/pageslider',
    'app/views/Layout',
    'app/views/Home',
    'app/views/NextPage',
], function ($, Backbone, PageSlider, LayoutView, HomeView, NextPageView) {
    'use strict';

    var slider = new PageSlider($('body'));

    var layout = new LayoutView();

    return Backbone.Router.extend({

        routes: {
            '': 'home',
            'nextPage': 'nextPage',
        },

        loadPage: function(view) {
            layout.setContentView(view);
            slider.slidePage(layout.render().$el);
        },

        home: function () {
            layout.setOptions({
                title: 'Accueil',
            });
            this.loadPage(new HomeView());
        },

        nextPage: function () {
            layout.setOptions({
                title: 'NextPage',
            });
            this.loadPage(new NextPageView());
        },

    });

});

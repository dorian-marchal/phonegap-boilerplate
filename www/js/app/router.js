define(function (require) {
    'use strict';

    var $ = require('jquery');
    var Backbone = require('backbone');
    var PageSlider = require('app/util/pageslider');
    var LayoutView = require('app/views/Layout');
    var HomeView = require('app/views/Home');
    var NextPageView = require('app/views/NextPage');
    var slider = new PageSlider($('body'));

    var layout = new LayoutView();
    var homeView = new HomeView();
    var nextPageView = new NextPageView();

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
            this.loadPage(homeView);
        },

        nextPage: function () {
            layout.setOptions({
                title: 'NextPage',
            });
            this.loadPage(nextPageView);
        },

    });

});

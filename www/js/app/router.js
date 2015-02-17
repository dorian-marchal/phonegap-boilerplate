define(function (require) {
    'use strict';

    var $           = require('jquery');
    var Backbone    = require('backbone');
    var PageSlider  = require('app/util/pageslider');
    var LayoutView    = require('app/views/Layout');
    var HomeView    = require('app/views/Home');
    var NextPageView    = require('app/views/NextPage');
    var slider = new PageSlider($('body'));

    var layout = new LayoutView();
    var homeView = new HomeView();
    var nextPageView = new NextPageView();

    return Backbone.Router.extend({

        routes: {
            '': 'home',
            'nextPage': 'nextPage',
        },

        home: function () {
            layout.setContentView(homeView);
            slider.slidePage(layout.render().$el);
        },

        nextPage: function () {
            layout.setContentView(homeView);
            homeView.delegateEvents();
            slider.slidePage(layout.render().$el);
        },

    });

});

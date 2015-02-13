define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        PageSlider  = require('app/util/pageslider'),
        HomeView    = require('app/views/Home'),
        NextPageView    = require('app/views/NextPage'),

        slider = new PageSlider($('body')),

        homeView = new HomeView(),
        nextPageView = new NextPageView();

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "nextPage": "nextPage",
        },

        home: function () {
            homeView.delegateEvents();
            slider.slidePage(homeView.$el);
        },

        nextPage: function () {
            nextPageView.delegateEvents();
            slider.slidePage(nextPageView.$el);
        },

    });

});

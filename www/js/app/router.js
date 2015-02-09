define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        PageSlider  = require('app/util/pageslider'),
        HomeView    = require('app/views/Home'),

        slider = new PageSlider($('body')),

        homeView = new HomeView();

    return Backbone.Router.extend({

        routes: {
            "": "home",
        },

        home: function () {
            homeView.delegateEvents();
            slider.slidePage(homeView.$el);
        },

    });

});

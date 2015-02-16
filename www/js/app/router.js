define(function (require) {
    'use strict';

    var $           = require('jquery');
    var Backbone    = require('backbone');
    var PageSlider  = require('app/util/pageslider');
    var LayoutView    = require('app/views/Layout');
    var HomeView    = require('app/views/Home');
    var NextPageView    = require('app/views/NextPage');
    var slider = new PageSlider($('body'));

    var layoutView = new LayoutView();
    var homeView = new HomeView();
    var nextPageView = new NextPageView();

    return Backbone.Router.extend({

        routes: {
            '': 'home',
            'nextPage': 'nextPage',
        },

        home: function () {
            homeView.delegateEvents();
            var $layout = layoutView.render().$el;
            $layout.find('#content').html(homeView.$el);
            slider.slidePage($layout);
        },

        nextPage: function () {
            nextPageView.delegateEvents();
            var $layout = layoutView.render().$el;
            $layout.find('#content').html(nextPageView.$el);
            slider.slidePage($layout);
        },

    });

});

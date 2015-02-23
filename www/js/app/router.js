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

    });

});

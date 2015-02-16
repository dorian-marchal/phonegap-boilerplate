define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/Header',
    'app/views/Footer',
], function ($, _, Backbone, HeaderView, FooterView) {
    'use strict';

    var header = new HeaderView();
    var footer = new FooterView();

    return Backbone.View.extend({

        render: function() {
            this.$el = $('body');
            this.$el.find('#header').html(header.el);
            this.$el.find('#footer').html(footer.el);
            return this;
        },

    });

});

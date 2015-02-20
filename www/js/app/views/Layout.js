define([
    'jquery',
    'underscore',
    'backbone',
    'core/views/AppView',
    'text!app/templates/Layout.html',
    'app/views/Header',
    'app/views/Footer',
], function ($, _, Backbone, AppView, template, HeaderView, FooterView) {
    'use strict';

    var header = new HeaderView();
    var footer = new FooterView();

    return AppView.extend({

        initialize: function () {
            AppView.prototype.initialize.apply(this);
            this.template = _.template(template);

            this.options = {
                title: 'Backbone Boilerplate',
            };
        },

        setOptions: function(options) {
            $.extend(this.options, options);
        },

        setContentView: function(contentView) {
            this.contentView = contentView;
        },

        render: function() {
            $('title').html(this.options.title);
            this.$el = $(this.template());
            this.$el.find('.header').html(header.render({
                title: this.options.title,
            }).el);
            this.$el.find('.content').html(this.contentView.render().el);
            this.$el.find('.footer').html(footer.render().el);
            return this;
        },

    });

});

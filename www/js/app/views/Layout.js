define([
    'config',
    'jquery',
    'underscore',
    'core/views/AppView',
    'text!app/templates/Layout.html',
], function (config, $, _, AppView, template) {
    'use strict';

    return AppView.extend({

        initialize: function () {
            AppView.prototype.initialize.apply(this, arguments);
            this.template = _.template(template);

            this.options = {
                title: config.appName,
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

            this.$el.find('.content').html(this.contentView.render().$el);

            return this;
        },

    });

});

define([
    'jquery',
    'underscore',
    'backbone',
    'core/views/AppView',
    'text!app/templates/Header.html',
], function ($, _, Backbone, AppView, template) {
    'use strict';

    return AppView.extend({

        initialize: function () {
            AppView.prototype.initialize.apply(this);
            this.template = _.template(template);
        },

        render: function (options) {
            this.$el.html($(this.template(options)));
            return this;
        },

    });

});

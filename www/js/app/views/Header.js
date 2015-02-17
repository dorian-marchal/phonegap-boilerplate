define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/AppView',
    'text!templates/Header.html',
], function ($, _, Backbone, AppView, template) {
    'use strict';

    return AppView.extend({

        init: function () {
            this.template = _.template(template);
        },

        render: function (options) {
            this.$el.html($(this.template(options)));
            return this;
        },

    });

});

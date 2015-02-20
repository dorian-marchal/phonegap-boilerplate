define([
    'jquery',
    'underscore',
    'backbone',
    'core/views/AppView',
    'text!app/templates/NextPage.html',
],function ($, _, Backbone, AppView, template) {
    'use strict';

    return AppView.extend({

        className: 'container',

        init: function () {
            this.template = _.template(template);
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

    });

});

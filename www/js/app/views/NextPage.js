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

        initialize: function () {
            AppView.prototype.initialize.apply(this);
            this.template = _.template(template);
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

    });

});

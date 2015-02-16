define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/AppView',
    'text!templates/Footer.html',
], function ($, _, Backbone, AppView, template) {
    'use strict';

    return AppView.extend({

        init: function () {
            this.template = _.template(template);
        },

        render: function () {
            this.el = $(this.template());
            return this;
        },

    });

});

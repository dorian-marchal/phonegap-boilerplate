define([
    'jquery',
    'underscore',
    'backbone',
    'models/mymodel',
    'text!templates/NextPage.html',
],function ($, _, Backbone, MyModel, nextPageTemplate) {
    'use strict';

    var template = _.template(nextPageTemplate);

    return Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(template());
            return this;
        },

    });

});

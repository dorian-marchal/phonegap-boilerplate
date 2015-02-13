define([
    'jquery',
    'underscore',
    'backbone',
    'models/mymodel',
    'text!templates/Home.html',
],function ($, _, Backbone, MyModel, homeTemplate) {
    'use strict';

    var template = _.template(homeTemplate);

    return Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(template());
            return this;
        },

        events: {
            'submit .mymodel-form' : 'postMyModel',
            'click [data-js-action="nextPage"]' : 'nextPage',
        },

        postMyModel: function(event) {
            event.preventDefault();
            var that = this;

            var mymodel = new MyModel();
            mymodel.set('attribute', $('[name="attribute"]').val());
            mymodel.set('attribute2', $('[name="attribute2"]').val());

            mymodel.on('invalid', function(model, error) {
                alert(error);
            });

            mymodel.save({
                success: function() {
                    that.trigger('postMyModel');
                },
            });
        },

        nextPage: function() {

        },

    });

});

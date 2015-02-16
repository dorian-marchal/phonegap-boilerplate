define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/AppView',
    'text!templates/Home.html',
    'models/mymodel',
], function ($, _, Backbone, AppView, template, MyModel) {
    'use strict';

    return AppView.extend({

        className: 'container',

        init: function () {
            this.template = _.template(template);
        },

        events: {
            'submit .mymodel-form' : 'postMyModel',
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

        render: function () {
            this.$el.html(this.template());
            return this;
        },

    });

});

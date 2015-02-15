define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/AppView',
    'models/mymodel',
], function ($, _, Backbone, AppView, MyModel) {
    'use strict';

    return AppView.extend({

        id: 'Home',

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

    });

});

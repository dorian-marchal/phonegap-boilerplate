define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/AppView',
    'text!templates/Home.html',
    'text!templates/MyModel.html',
    'models/mymodels',
], function ($, _, Backbone, AppView, template, myModelTemplate, MyModels) {
    'use strict';

    return AppView.extend({

        className: 'container',

        init: function () {
            var that = this;

            this.template = _.template(template);
            this.myModelsTemplate = _.template(myModelTemplate);
            this.myModels = new MyModels();

            this.myModels.on('add change remove', this.renderMyModels, this);
        },

        events: {
            'submit .mymodel-form' : 'postMyModel',
        },

        postMyModel: function(event) {
            event.preventDefault();
            var that = this;

            that.myModels.on('invalid', function(model, error) {
                alert(error);
            });

            that.myModels.create({
                attribute: $('[name="attribute"]').val(),
                attribute2: $('[name="attribute2"]').val(),
            }, {
                // wait: true,
                validate: true,
                error: function(model, res, error) {
                    console.log(model, res, error);
                }
            });

        },

        renderMyModels: function() {
            var that = this;

            var $myModelList = $('.mymodel-list ul');
            $myModelList.empty();

            this.myModels.each(function(myModel) {
                $myModelList.append(that.myModelsTemplate(myModel.toJSON()));
            });
        },

        render: function () {
            var that = this;

            that.myModels.fetch();
            that.$el.html(that.template());
            return that;
        },

    });

});

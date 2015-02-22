define([
    'jquery',
    'underscore',
    'backbone',
    'core/views/AppView',
    'text!app/templates/Home.html',
    'text!app/templates/MyModel.html',
    'app/models/mymodels',
], function ($, _, Backbone, AppView, template, myModelTemplate, MyModels) {
    'use strict';

    return AppView.extend({

        className: 'container',

        initialize: function () {
            AppView.prototype.initialize.apply(this);
            var that = this;

            that.template = _.template(template);
            that.myModelsTemplate = _.template(myModelTemplate);
            that.myModels = new MyModels();

            that.myModels.on('change', that.renderMyModels, that);
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
                wait: true,
                validate: true,
                error: function(model, res, error) {
                    alert('Les données n\'ont pas pu être enregistrées. Le serveur REST est lancé ?');
                    console.log(model, res, error);
                }
            });

        },

        renderMyModels: function() {
            var that = this;

            var $myModelList = $('.mymodel-list ul');
            $myModelList.empty();

            that.myModels.each(function(myModel) {
                $myModelList.append(that.myModelsTemplate(myModel.toJSON()));
            });
        },

        render: function () {
            var that = this;

            that.myModels.fetch({
                success: function(model, res, error) {
                    that.renderMyModels();
                },
                error: function(model, res, error) {
                    alert('Les données n\'ont pas pu être récupérées. Le serveur REST est lancé ?');
                }
            });
            that.$el.html(that.template());
            return that;
        },

    });

});

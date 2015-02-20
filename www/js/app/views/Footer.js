define([
    'jquery',
    'underscore',
    'backbone',
    'core/views/AppView',
    'text!app/templates/Footer.html',
], function ($, _, Backbone, AppView, template) {
    'use strict';

    return AppView.extend({

        events: {
            'click [data-back]' : function() {
                history.back();
            },
            'click [data-route]' : function(event) {
                alert("ok");
                location.hash = $(event.target).attr('data-route');
            }
        },

        init: function () {
            this.template = _.template(template);
        },

        render: function () {
            this.$el.html($(this.template()));
            return this;
        },

    });

});

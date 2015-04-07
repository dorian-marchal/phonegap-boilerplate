define([
    'underscore',
    '__',
    'core/views/PageView',
    'text!app/templates/Territory.html',
],function (_, __, PageView, template) {
    'use strict';

    return PageView.extend({

        layoutOptions: {
            title: __.t('Territoire'),
        },

        initialize: function () {
            PageView.prototype.initialize.apply(this, arguments);
            this.template = _.template(template);
        },

        render: function () {
            this.$el.html(this.template({
                __: __,
            }));
            return this;
        },

    });

});

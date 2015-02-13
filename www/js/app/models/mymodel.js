define([
    'underscore',
    'backbone',
    'jquery',
], function(_, Backbone, $) {
    'use strict';

    var MyModel = Backbone.Model.extend({
        url: 'http://localhost:8080/mymodels',

        validate: function(attributes) {

            if (attributes.attribute === '' || attributes.attribute2 === '') {
                return 'Attributes must be set!';
            }
            else if (!$.isNumeric(attributes.attribute2)) {
                return 'attribute2 must be numeric!';
            }
        },
    });

    return MyModel;
});

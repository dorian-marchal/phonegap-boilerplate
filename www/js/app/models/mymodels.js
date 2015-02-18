define([
    'underscore',
    'backbone',
    'jquery',
    'models/mymodel',
], function(_, Backbone, $, MyModel) {
    'use strict';

    var MyModels = Backbone.Collection.extend({
        model: MyModel,
        url: 'http://localhost:8080/mymodels',
    });

    return MyModels;
});

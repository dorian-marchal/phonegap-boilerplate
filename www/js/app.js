require(['config'], function(config) {
    'use strict';

    require.config(config);

    require(['jquery', 'backbone', 'app/router'], function ($, Backbone, Router) {

        var router = new Router();
        Backbone.history.start();
    });
});

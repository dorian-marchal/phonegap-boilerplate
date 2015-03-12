require(['config'], function(config) {
    'use strict';

    require.config(config);

    require(['domReady!', 'jquery', 'backbone', 'fastclick', 'app/router'], function (domReady, $, Backbone, FastClick, Router) {

        $.ajaxSetup({
            xhrFields: {
                withCredentials: true,
            }
        });

        FastClick.attach(document.body);

        var router = new Router();
        Backbone.history.start();
    });
});

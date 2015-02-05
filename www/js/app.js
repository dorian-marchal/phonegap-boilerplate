require.config({

    baseUrl: '',

    paths: {
        app: 'js/app',
        tpl: 'js/tpl'
        jquery: 'bower_components/jquery/dist/jquery-min',
        backbone: 'bower_components/backbone/backbone',
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'bower/jquery'],
            exports: 'Backbone'
        },
        'bower/underscore': {
            exports: '_'
        }
    }
});
require(['jquery', 'backbone', 'app/router'], function ($, Backbone, Router) {

    var router = new Router();

    $("body").on("click", ".back-button", function (event) {
        event.preventDefault();
        window.history.back();
    });

    Backbone.history.start();
});

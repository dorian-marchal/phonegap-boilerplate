require.config({

    urlArgs: 'bust=' + (new Date()).getTime(),

    baseUrl: '',

    paths: {
        core: 'js/core',
        app: 'js/app',
        jquery: 'bower_components/jquery/dist/jquery.min',
        backbone: 'bower_components/backbone/backbone',
        underscore: 'bower_components/underscore/underscore-min',
        text: 'bower_components/text/text',
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['jquery', 'backbone', 'app/router'], function ($, Backbone, Router) {

    'use strict';
    var router = new Router();
    Backbone.history.start();
});

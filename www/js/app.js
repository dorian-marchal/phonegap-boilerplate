require(['config'], function(config) {
    'use strict';

    require.config(config);

    require([
        'domReady!',
        'jquery',
        'backbone',
        'fastclick',
        'core/utils/PageSlider',
        'app/Controller',
        'app/singletons/router',
        'app/singletons/auth'
    ], function (domReady, $, Backbone, FastClick, PageSlider, Controller, router, auth) {

        FastClick.attach(document.body);

        if (config.debug.useWeinre) {
            $('head').append('<script src="http://' + config.debug.weinreHost + ':' + config.debug.weinrePort + '/target/target-script-min.js#anonymous"></script>');
        }

        var start = function() {
            router.setController(new Controller());
            router.setSlider(new PageSlider($('body')));
            Backbone.history.start();
        };

        if (config.useAuth) {
            auth.checkLogin(function() {
                start();
            });
        }
        else {
            start();
        }
    });
});

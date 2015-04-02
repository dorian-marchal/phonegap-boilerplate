require(['config'], function(config) {
    'use strict';

    require.config(config);

    require([
        'cordova',
        'domReady!',
        'async',
        '__',
        'jquery',
        'backbone',
        'fastclick',
        'core/utils/PageSlider',
        'app/Controller',
        'app/singletons/router',
        'app/singletons/auth'
    ], function (cordova, domReady, async, __, $, Backbone, FastClick, PageSlider, Controller, router, auth) {

        // Use application/x-www-form-urlencoded
        Backbone.emulateJSON = true;

        // Global vars are stored in navigator.pb
        navigator.pb = {};

        // FastClick, for better user experience
        FastClick.attach(document.body);

        // Weinre, if we want to debug
        if (config.debug.useWeinre) {
            $('head').append('<script src="http://' + config.debug.weinreHost + ':' + config.debug.weinrePort + '/target/target-script-min.js#anonymous"></script>');
        }

        var toWait = {};

        // Check if authentificated
        if (config.useAuth) {
            toWait.login = function(done) {
                auth.checkLogin(function() {
                    done(null);
                });
            };
        }

        // Get device language
        toWait.language = function(done) {
            navigator.globalization.getPreferredLanguage(function(language) {

                // Initialize i18n
                __.init(language.value, function() {
                    done(null);
                });

            });
        };

        var start = function() {
            router.setController(new Controller());
            router.setSlider(new PageSlider($('body')));
            Backbone.history.start();
        };

        // We wait for the device to be ready
        document.addEventListener('deviceready', function() {

            // Wait for all the async functions to complete
            async.parallel(toWait, function(err) {

                if (err) {
                    throw err;
                }

                start();
            });
        }, false);

        document.dispatchEvent(new Event('pb-init'));

    });
});

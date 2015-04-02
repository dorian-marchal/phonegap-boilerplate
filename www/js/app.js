// load config file
require(['config'], function(config) {
    'use strict';

    require.config(config);

    // Wait for the device to be ready and i18n init
    require([
        'cordova',
        '__',
    ], function (cordova, __) {

        // We wait for the device to be ready
        document.addEventListener('deviceready', function() {
            navigator.globalization.getPreferredLanguage(function(language) {

                // Initialize i18n
                __.init(language.value, function() {
                    start();
                });
            });
        }, false);

        // The fake cordova.js (www/cordova.js) listen to this event to shim deviceready event
        document.dispatchEvent(new Event('ready-to-shim'));

        // Load the app
        var start = function() {

            require([
                'domReady!',
                'async',
                'jquery',
                'backbone',
                'fastclick',
                'core/utils/PageSlider',
                'app/Controller',
                'app/singletons/router',
                'app/singletons/auth'
            ], function (domReady, async, $, Backbone, FastClick, PageSlider, Controller, router, auth) {

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

                // Wait for all the async functions to complete
                async.parallel(toWait, function(err) {

                    if (err) {
                        throw err;
                    }
                    router.setController(new Controller());
                    router.setSlider(new PageSlider($('body')));
                    Backbone.history.start();
                });
            });
        };
    });
});

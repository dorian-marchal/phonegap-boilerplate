// load config file
require([
    'app/singletons/conf',
], function(config) {
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
                'globals',
                'domReady!',
                'async',
                'jquery',
                'backbone',
                'fastclick',
                'core/utils/PageSlider',
                'app/router',
                'app/singletons/auth'
            ], function (globals, domReady, async, $, Backbone, FastClick, PageSlider, Router, auth) {

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

                // We wait a few seconds to let the splashscreen shine
                toWait.letSplash = function(done) {
                    setTimeout(function() {
                        done();
                    }, config.splashScreenMinimumDurationMs);
                };

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

                    var router = new Router();
                    router.setSlider(new PageSlider($('body')));
                    globals.setRouter(router);
                    Backbone.history.start();

                    // Hide the splashscreen
                    navigator.splashscreen.hide();
                });
            });
        };
    });
});

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
        'moment',
        'app/errorHook',
        'app/beforeInitHook',
    ], function (cordova, __, moment, errorHook, beforeInitHook) {

        // We wait for the device to be ready
        document.addEventListener('deviceready', function() {
            navigator.globalization.getPreferredLanguage(function(language) {

                // Load the moment locale
                moment.locale(language.value.substr(0, 2));

                // Initialize i18n
                __.init(language.value, function() {
                    beforeInitHook(function () {
                        init();
                    });
                });
            });
        }, false);

        // The fake cordova.js (www/cordova.js) listen to this event to shim deviceready event
        var readyToShimEvent = document.createEvent('Event');
        readyToShimEvent.initEvent('ready-to-shim', true, true);
        document.dispatchEvent(readyToShimEvent);

        // Load the app
        var init = function() {

            require([
                'globals',
                'domReady!',
                'async',
                'jquery',
                'backbone',
                'fastclick',
                'pageslider',
                'app/router',
                'app/singletons/auth',
                'app/initHook',
            ], function (globals, domReady, async, $, Backbone, FastClick, PageSlider, Router, auth, initHook) {

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

                // Check if authenticated
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

                    // Execute some code before starting the app (after the splashscreen)
                    initHook(function() {
                        var router = new Router();
                        var slider = new PageSlider($('body'));

                        // Show a warning if not in production (avoid pushing a dev app in production)
                        if (!globals.config.hideDistWarning && (window.environment !== 'dist' || !globals.config.isProductionConfig)) {
                            var environment = window.environment + '/' + globals.config.environment;

                            plugins.toast.show(
                                __.t('Be careful, you are using a development version of the app (' + environment + ')'),
                                'long',
                                'bottom'
                            );

                            console.log('[' + environment + '] In production set the `environment` var to "dist" in `/index.html` and set `isProductionConfig` to true in your config file.');
                        }

                        // On old Android devices, hardware acceleration causes
                        // fucked up behavior on scroll with fixed elements
                        // so we disable it.
                        if (device.platform === 'Android' && parseFloat(device.version) < 4.2) {
                            slider.disableTransitions();
                        }

                        router.setSlider(slider);
                        globals.setRouter(router);
                        Backbone.history.start();
                    });
                });
            }, errorHook);
        };
    });
});

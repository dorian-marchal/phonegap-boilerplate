/**
 * Helper used to manage backbutton event on Android
 * @module backbuttonManager
 */
define([
    'jquery',
    'async',
], function ($, async) {

    'use strict';

    // Override the backbutton event
    $(document).on('backbutton', function () {

        var goBack = true;
        var asyncListeners = [];

        var asyncListenerFactory = function (listener) {
            return function (done) {
                listener(function (dontPrevent) {
                    done(null, dontPrevent);
                });
            };
        };

        // Prepare the listeners
        for (var i = 0; i < listeners.length; i++) {
            asyncListeners.push(asyncListenerFactory(listeners[i]));
        }

        async.parallel(asyncListeners, function (err, res) {

            // If a listener returns false, the backbutton dont go back
            for (var i = 0; i < res.length; i++) {
                if (res[i] === false) {
                    goBack = false;
                }
            }

            if (goBack) {
                history.back();
            }
        });

    });

    var listeners = [];

    return {

        /**
         * Add a back button listener. A `done` callback is passed to the given
         * listener. If the listener call this callback passing false, the default
         * backbutton action is prevented.
         * @param {Function} listener Listener to add
         */
        addListener: function (listener) {
            listeners.push(listener);
        },

        /**
         * Remove a back button listener
         * @param {Function} listener Listener to remove
         */
        removeListener: function (listener) {
            listeners.splice(listeners.indexOf(listener), 1);
        },
    };
});

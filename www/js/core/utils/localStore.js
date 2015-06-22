/**
 * Wrapper around localStorage features to ease json encoding/decoding
 */
define(function () {
    'use strict';

    return {

        /**
         * Set localStorage[key] to JSON encoded value
         */
        set: function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },

        /**
         * Return JSON decoded localStorage[key]
         */
        get: function (key) {
            return JSON.parse(localStorage.getItem(key));
        },
    };
});

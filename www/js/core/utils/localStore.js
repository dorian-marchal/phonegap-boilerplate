/**
 * Wrapper around localStorage features to ease json encoding/decoding
 * @module localStore
 */
define(function () {
    'use strict';

    return {

        /**
         * Set localStorage[key] to JSON encoded value
         * @param {String} key Item key
         * @param {Object} value Item, will be json encoded
         */
        set: function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },

        /**
         * Return JSON decoded localStorage[key]
         * @param {String} key item key
         * @returns {Object} the json decoded item
         */
        get: function (key) {
            return JSON.parse(localStorage.getItem(key));
        },
    };
});

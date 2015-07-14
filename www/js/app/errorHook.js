/**
 * The function returned by this module will be executed if a requirejs
 * loading error occurs.
 * By default, the error is simply thrown.
 */
define(function () {
    'use strict';

    return function (err) {
        throw err;
    };

});

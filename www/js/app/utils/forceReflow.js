/**
 * Permet de forcer le reflow du navigateur.
 */
define(['jquery'], function ($) {
    'use strict';

    /* jshint -W030 */
    return function (el) {

        if (el instanceof $) {
            el = el.get(0);
        }

        el.offsetHeight;

        if (typeof(window.getComputedStyle) == 'function') {
            window.getComputedStyle(el).left;
        }
    };
});

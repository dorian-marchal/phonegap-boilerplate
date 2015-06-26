/**
 * Helper used to add a Spin.js loader to an element.
 */
define([
    'jquery',
    'spinner',
], function ($, Spinner) {
    'use strict';

    /**
     * Create a new loader.
     * @param {$} $el jQuery or DOM element in which the loader will be added
     * @param {string|object} options Whether :
     *     - {string} : A preset name previously added with addPreset (or Spin.js
     *                  options object)
     *     - {object} : Additional Spin.js options object
     */
    var Loader = function($el, preset, options) {

        options = options || {};
        this.el = $el instanceof $ ? $el.get(0) : $el;

        var loaderOptions;

        if (typeof preset === 'string') {
            loaderOptions = $.extend({}, Loader.presets[preset], options);
        }
        else {
            loaderOptions = preset || {};
        }

        this.options = $.extend({}, Loader.presets.default, loaderOptions);

        this.spinner = new Spinner(this.options);
    };

    Loader.presets = {
        'default': {
            lines: 11,
            length: 10,
            width: 5,
            radius: 20,
            scale: 1,
            corners: 1,
            rotate: 0,
            direction: 1,
            color: '#333',
            speed: 1,
            trail: 60,
            shadow: false,
            hwaccel: true,
            className: 'spinner',
            zIndex: 2e9,
            top: '50%',
            left: '50%'
        },
    };

    /**
     * Add a preset of options. All presets inherit the default one
     * So the option properties are not all required.
     * The default preset can be overriden.
     */
    Loader.addPreset = function (name, preset) {
        Loader.presets[name] = preset;
    };

    Loader.prototype = {

        start: function() {
            this.spinner.spin(this.el);
        },

        stop: function() {
            this.spinner.stop();
        },
    };

    return Loader;
});

/**
 * Helper to easily preload images before adding them to the DOM
 */
define(['jquery'], function ($) {
    'use strict';

    var imagesWrapperId = 'preload-preloaded-images-wrapper';

    var createWrapper = function () {
        var $wrapper = $('<div>', {
            id: imagesWrapperId,
            css: {
                display: 'none'
            }
        });
        $('body').prepend($wrapper);
        return $wrapper;
    };

    /**
     * A simple function useful to preload images.
     * @function preload
     * @param {String} src Image source
     * @param {Function} callback Called when the image is preloaded
     */
    return function (src, callback) {
        callback = callback || $.noop;

        var $img = $('<img>', { src: src });

        $img.on('load', function() {
            callback();
        });

        var $wrapper = $('#' + imagesWrapperId);

        if ($wrapper.length === 0) {
            $wrapper = createWrapper();
        }

        $wrapper.append($img);
    };
});

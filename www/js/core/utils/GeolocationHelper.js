/**
 * Helper to easily add global geolocation to an app via
 * navigator.geolocation (Phonegap).
 *
 * GeolocationHelper can trigger these events :
 *     trackingStart: when tracking start
 *     trackingStop: when tracking stop
 *     locationSuccess: when a location is found (a Position object is passed)
 *     locationError: when an error occur (an Error object is passed)
 */
define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    var idTracker = null;

    var GeolocationHelper = function (options) {
        _.extend(this.options, options);
    };

    _.extend(GeolocationHelper.prototype, Backbone.Events, {

        options: {
            maximumAge: 3000,
            enableHighAccuracy: true,
            timeout: 5000,
        },

        lastPosition: null,

        startTracking: function () {
            if (idTracker === null) {
                idTracker = navigator.geolocation.watchPosition(this.onLocationSuccess.bind(this), this.onLocationError.bind(this), this.options);
                this.trigger('trackingStart');
            }
        },

        stopTracking: function () {
            if (idTracker !== null) {
                navigator.geolocation.clearWatch(idTracker);
                idTracker = null;
                this.trigger('trackingStop');
            }
        },

        isTracking: function () {
            return idTracker !== null;
        },

        getLastPosition: function () {
            return this.lastPosition;
        },

        onLocationSuccess: function (position) {
            this.trigger('locationSuccess', position);
        },

        onLocationError: function (error) {
            this.trigger('locationError', error);
        },
    });

    return GeolocationHelper;
});

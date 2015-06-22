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

    /**
     * Calculate the distance between two points on Earth
     * @param {object} pointA {latitude, longitude}
     * @param {object} pointB {latitude, longitude}
     * @return {int} distance in meters
     */
    GeolocationHelper.getDistanceBetween = function (pointA, pointB) {
        var toRad = function (val) {
            return val * Math.PI / 180;
        };

        var aRadLatitude = toRad(pointA.latitude);
        var aRadLongitude = toRad(pointA.longitude);

        var bRadLatitude = toRad(pointB.latitude);
        var bRadLongitude = toRad(pointB.longitude);

        return Math.round(6371030 * Math.acos(Math.sin(aRadLatitude) * Math.sin(bRadLatitude) +
            Math.cos(aRadLatitude) * Math.cos(bRadLatitude) * Math.cos(aRadLongitude - bRadLongitude)));
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

        /**
         * Toggle the geolocation tracking
         * @return {bool} true if the tracking has been started, false otherwise
         */
        toggleTracking: function () {
            if (this.isTracking()) {
                this.stopTracking();
                return false;
            }
            else {
                this.startTracking();
                return true;
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

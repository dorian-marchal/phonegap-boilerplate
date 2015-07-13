define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    var idTracker = null;

    /**
     * Helper to easily add global geolocation to an app via
     * navigator.geolocation (Phonegap).
     * @class
     * @param {object} options Same options as navigator.geolocation.watchPosition
     */
    var GeolocationHelper = function (options) {
        _.extend(this.options, options);
    };

    /**
     * Static function that calculate the distance between two points on Earth
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

        /**
         * Get the current GPS coordinates
         * @param {object} options Same options as `navigator.geolocation.watchPosition`
         * @fires locationSuccess when a location is found (a Position object is passed)
         * @fires currentPositionSuccess when a location is found (a Position object is passed)
         * @fires locationError when an error occur (an Error object is passed)
         * @fires currentPositionError when an error occur (an Error object is passed)
         */
        getCurrentPosition: function (options) {
            options = options || {};

            navigator.geolocation.getCurrentPosition(
                this.onCurrentPositionSuccess.bind(this),
                this.onCurrentPositionError.bind(this),
                _.extend({}, this.options, {
                    maximumAge: 15000,
                    timeout: 15000,
                }, options)
            );
        },

        /**
         * Start the tracking
         * @fires trackingStart
         */
        startTracking: function () {
            if (idTracker === null) {
                idTracker = navigator.geolocation.watchPosition(this.onLocationSuccess.bind(this), this.onLocationError.bind(this), this.options);
                this.trigger('trackingStart');
            }
        },

        /**
         * Stop the tracking
         * @fires trackingStop
         */
        stopTracking: function () {
            if (idTracker !== null) {
                navigator.geolocation.clearWatch(idTracker);
                idTracker = null;
                this.trigger('trackingStop');
            }
        },

        /**
         * Toggle the geolocation tracking
         * @return {Boolean} true if the tracking has been started, false otherwise
         * @fires trackingStart if the tracking has been started
         * @fires trackingStop if the tracking has been stopped
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

        /**
         * @return {Boolean} true if the tracking is started, false otherwise
         */
        isTracking: function () {
            return idTracker !== null;
        },

        /**
         * @return {Position} the last known position
         */
        getLastPosition: function () {
            return this.lastPosition;
        },

        onLocationSuccess: function (position) {
            this.lastPosition = position; // cache the last position
            this.trigger('locationSuccess', position);
        },

        onLocationError: function (error) {
            this.trigger('locationError', error);
        },

        onCurrentPositionSuccess: function (position) {
            this.trigger('locationSuccess', position);
            this.trigger('currentPositionSuccess', position);
        },

        onCurrentPositionError: function (error) {
            this.trigger('locationError', error);
            this.trigger('currentPositionError', error);
        },
    });

    return GeolocationHelper;
});

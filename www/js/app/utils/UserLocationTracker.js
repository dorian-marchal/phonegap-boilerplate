/**
 * Helps to add a marker that follow the user on a map.
 */
define([
    'backbone',
    'underscore',
    'gmaps',
    'app/singletons/geolocation',
], function (Backbone, _, GMaps, geolocation) {
    'use strict';

    var UserLocationTracker = function () {};

    _.extend(UserLocationTracker.prototype, Backbone.Events, {

        constructor: UserLocationTracker,
        map: null,
        marker: null,

        setMap: function (map) {

            if (!map) {
                console.error('this.map is undefined');
                return;
            }

            this.map = map;

            if (this.marker) {
                this.marker.setMap(map.map);
            }
            else {
                this._createMarker();
            }
        },

        /**
         * Start showing the user position on the map.
         */
        start: function () {

            if (!this.marker) {
                console.error('this.marker is undefined');
                return;
            }

            if (!this.map) {
                console.error('this.map is undefined');
                return;
            }

            if (geolocation.isTracking()) {
                this.marker.setVisible(true);
            }

            this.listenTo(geolocation, 'trackingStart', function () {
                this.marker.setVisible(true);
            }.bind(true));

            this.listenTo(geolocation, 'trackingStop', function () {
                this.marker.setVisible(false);
            }.bind(true));

            this.listenTo(geolocation, 'locationSuccess', function (position) {
                this._updateMarkerPosition(position.coords.latitude, position.coords.longitude);
            }.bind(this));
        },

        /**
         * Stop showing the user position.
         * Be careful, this does not stop tracking the geolocation.
         */
        stop: function () {
            if (this.marker) {
                this.marker.setVisible(false);
            }
            this.stopListening(geolocation);
        },

        /**
         * Create a hidden marker on the map
         */
        _createMarker: function () {

            if (!this.map) {
                console.error('this.map is undefined');
                return;
            }

            this.marker = this.map.addMarker({ lat: 0, lng: 0 });
            this.marker.setVisible(false);
        },

        /**
         * Update the user position on the map
         */
        _updateMarkerPosition: function (latitude, longitude) {
            this.marker.setPosition({
                lat: latitude,
                lng: longitude,
            });
        },

    });

    return UserLocationTracker;
});

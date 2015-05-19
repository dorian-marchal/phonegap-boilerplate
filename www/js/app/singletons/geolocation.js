/**
 * Singleton used to manage the geolocation.
 */
define([
    'core/utils/GeolocationHelper',
], function (GeolocationHelper) {
    'use strict';

    return new GeolocationHelper();
});

// Only here to prevent requirejs error in browser testing
// The real cordova.js is injected on build by Phonegap
// and this file is loaded only when testing in a browser

(function() {

'use strict';
// Phonegap shim :

// globalization plugin
navigator.globalization = {};

navigator.globalization.getPreferredLanguage = function(success) {
    success({ value: 'fr-FR' });
};

// device
window.device = window.device || {
    platform: 'browser',
    version: '42',
};

// splashscreen
navigator.splashscreen = {};

navigator.splashscreen.hide = function() {};

// geolocation

var mockPositions = [
    { coords: { latitude: 48.701004, longitude: 6.176736 } },
    { coords: { latitude: 48.700905, longitude: 6.176650 } },
    { coords: { latitude: 48.700785, longitude: 6.176597 } },
    { coords: { latitude: 48.700671, longitude: 6.176538 } },
    { coords: { latitude: 48.700572, longitude: 6.176468 } },
    { coords: { latitude: 48.700484, longitude: 6.176409 } },
    { coords: { latitude: 48.700381, longitude: 6.176371 } },
    { coords: { latitude: 48.700307, longitude: 6.176312 } },
    { coords: { latitude: 48.700229, longitude: 6.176307 } },
    { coords: { latitude: 48.700232, longitude: 6.176436 } },
    { coords: { latitude: 48.700282, longitude: 6.176548 } },
    { coords: { latitude: 48.700307, longitude: 6.176452 } },
    { coords: { latitude: 48.700402, longitude: 6.176398 } },
    { coords: { latitude: 48.700516, longitude: 6.176452 } },
    { coords: { latitude: 48.700597, longitude: 6.176495 } },
    { coords: { latitude: 48.700703, longitude: 6.176565 } },
    { coords: { latitude: 48.700795, longitude: 6.176607 } },
    { coords: { latitude: 48.700880, longitude: 6.176667 } },
    { coords: { latitude: 48.700976, longitude: 6.176715 } },
    { coords: { latitude: 48.701026, longitude: 6.176801 } },
    { coords: { latitude: 48.701089, longitude: 6.176709 } },
    { coords: { latitude: 48.701022, longitude: 6.176677 } },
];

navigator.geolocation.watchPosition = function (success) {

    var i = 0;

    return setInterval(function () {
        if (i === mockPositions.length) {
            i = 0;
        }

        success(mockPositions[i]);

        i++;
    }, 500);
};

navigator.geolocation.clearWatch = function (watcher) {
    clearInterval(watcher);
};

// socialsharing
window.plugins = {
    socialsharing: {
        share: function (subject, message, imageUrl, url) {
            console.log('Sujet:', subject);
            console.log('Message:', message);
            console.log('Url:', url);
            console.log('ImageUrl:', imageUrl);
        }
    }
};

// deviceready
document.addEventListener('ready-to-shim', function() {
    var deviceReadyShimEvent = document.createEvent('Event');
    deviceReadyShimEvent.initEvent('deviceready', true, true);
    document.dispatchEvent(deviceReadyShimEvent);
}, false);

})();

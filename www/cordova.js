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

// deviceready
document.addEventListener('ready-to-shim', function() {
    var deviceReadyShimEvent = document.createEvent('Event');
    deviceReadyShimEvent.initEvent('deviceready', true, true);
    document.dispatchEvent(deviceReadyShimEvent);
}, false);

})();

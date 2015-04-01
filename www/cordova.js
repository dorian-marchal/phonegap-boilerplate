// Only here to prevent requirejs error in browser testing
// The real cordova.js is injected on build by Phonegap

// Phonegap shim :

// globalization plugin
navigator.globalization = {};

navigator.globalization.getPreferredLanguage = function(success) {
	success({ value: 'fr-FR' });
};


// deviceready
document.addEventListener('pb-init', function() {
	document.dispatchEvent(new Event('deviceready'));
});

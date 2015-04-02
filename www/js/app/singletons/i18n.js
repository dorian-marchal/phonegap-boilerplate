/**
 * Singleton used to translate text
 * /!\ navigator.pb.language must be set before requiring this module
 */
define([
    'i18next',
], function (i18n) {

    'use strict';

    var __ = function() {

    	var that = this;

    	this.t = function() {
    		throw new Error('__.init must be called before using __.t');
    	};

	    this.init = function(language, done) {
	    	i18n.init({
	    		resGetPath: 'locales/__lng__/__ns__.json',
	    		lng: language,
	    		useCookie: false,
	    		fallbackLng: false,
	    		load: 'unspecific',
	    		fallbackOnNull: false,
	    		nsseparator: ':::',
	    		keyseparator: '::',
	    	}, function(t) {
	    		that.t = t;
	    		done();
	    	});
	    };
    };

    return new __();

});

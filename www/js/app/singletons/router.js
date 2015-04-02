define([
    'core/AppRouter',
], function (AppRouter) {
    'use strict';

    var Router = AppRouter.extend({

    	routes: {
    	    '': 'home',
    	},

    	home: function () {
    	    this.controller.home();
    	},
    });

    return new Router();

});

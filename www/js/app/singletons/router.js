define([
    'core/AppRouter',
], function (AppRouter) {
    'use strict';

    var Router = AppRouter.extend({

    	routes: {
            '': 'home',
    	    'territory': 'territory',
    	},

        home: function () {
            this.controller.home();
        },

    	territory: function () {
    	    this.controller.territory();
    	},
    });

    return new Router();

});

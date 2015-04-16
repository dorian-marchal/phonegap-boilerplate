define([
    'core/views/AppView',
], function (AppView) {
    'use strict';

    return AppView.extend({

        /**
         * Options passed to the layout
         */
        layoutOptions: {},

        /**
         * Called before page slide
         * The route parameters are passed to this function
         */
        beforeRender: function() {},

        /**
         * Called on page transition end (overridable)
         */
        afterRender: function() {},

    });

});

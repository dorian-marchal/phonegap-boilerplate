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
         * Called on page transition end (overridable)
         */
        transitionEnd: function() {},

    });

});

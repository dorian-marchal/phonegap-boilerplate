define([
    'core/views/AppView',
], function (AppView) {
    'use strict';

    return AppView.extend({

        /**
         * Must be unique through your app.
         * This property is used to identify the page in the controller
         * Moreover, the name is added as a class on the .page
         */
        name: '',

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

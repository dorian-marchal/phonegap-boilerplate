define([
    'globals',
    'core/views/AppView',
], function (globals, AppView) {
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
         * Called before the page is added to the DOM on page slide
         * The route parameters are passed to this function
         */
        beforeLoad: function () {},

        /**
         * Called after the page has been added to the DOM
         * And juste before the page transition
         */
        afterRender: function () {},

        /**
         * Called on page transition end (overridable)
         */
        afterLoad: function () {},

        /**
         * Called just before the page slide out
         * (just after newPage.afterRender)
         */
        beforeLeave: function () {},

        /**
         * Return true if this is the current loaded page
         */
        isCurrentPage: function () {
            return globals.currentPage == this;
        }


    });

});

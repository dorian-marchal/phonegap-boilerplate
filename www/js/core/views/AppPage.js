define([
    'globals',
    'core/views/AppView',
    'core/singletons/backbuttonManager',
], function (globals, AppView, backbuttonManager) {
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

        initialize: function () {
            AppView.prototype.initialize.apply(this, arguments);

            // Prepare this.onBackButton
            backbuttonManager.addListener(function (done) {

                if (this.isCurrentPage()) {
                    this.onBackButton(done);
                }
                else {
                    done();
                }
            }.bind(this));
        },

        /**
         * Called when the backbutton is pressed on the current page.
         * pass false to the done callback to prevent history.back
         */
        onBackButton: function (done) {
            done();
        },

        /**
         * Called before the page is added to the DOM on page slide
         * The route parameters are passed to this function.
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

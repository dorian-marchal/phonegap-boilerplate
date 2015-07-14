/**
 * A base view that extends from Backbone.View.
 * All the app views must inherit from this.
 * The general code of the views goes here.
 * @class AppView
 */
 define([
    'backbone',
], function (Backbone) {
    'use strict';

    return Backbone.View.extend({

        /**
         * Bind a subview to an element via a selector : render the subview in
         * the element node (a descendent of the current view).
         * @param {AppView} view The view to bind
         * @param {String} selector jQuery selector of the node element
         */
        assign : function (view, selector) {
            view.setElement(this.$(selector)).render();
        },

    });

});

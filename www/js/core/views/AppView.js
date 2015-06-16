/**
 * A base view.
 * All the app views must inherit from this.
 * The general code of the views goes here.
 */
 define([
    'backbone',
], function (Backbone) {
    'use strict';

    return Backbone.View.extend({

        /**
         * Bind a subview to an element via a selector.
         */
        assign : function (view, selector) {
            view.setElement(this.$(selector)).render();
        },

    });

});

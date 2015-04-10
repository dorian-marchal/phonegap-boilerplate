/**
 * The object from wich the app router must inherit.
 */
define([
    'jquery',
    'backbone',
], function ($, Backbone) {
    'use strict';

    return Backbone.Router.extend({

        setSlider: function(slider) {
            this.slider = slider;
        },
    });

});

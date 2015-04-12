/**
 * The object from wich the app controller must inherit.
 * The controller is controlled by the router and manage the different views.
 */
define([
    'jquery',
    'core/utils/PageSlider',
], function ($, PageSlider) {
    'use strict';

    var AppController = function() {};

    AppController.prototype = {

        slider: new PageSlider($('body')),

        /**
         * Load a PageView in the given layout.
         */
        loadPage: function (layout, pageView) {
            layout.setOptions(pageView.layoutOptions);
            layout.setContentView(pageView);
            this.slider.slidePage(layout.render().$el);
            layout.delegateEvents();
            pageView.delegateEvents();
        },

    };

    AppController.extend = function(newProps) {

        newProps.initialize = newProps.initialize || function() {};

        var Child = function() {
            AppController.apply(this, arguments);
            newProps.initialize.apply(this, arguments);
        };
        Child.prototype = $.extend(true, {}, AppController.prototype, newProps);
        Child.prototype.constructor = Child;

        return Child;
    };

    return AppController;

});

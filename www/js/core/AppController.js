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

    AppController.prototype.slider = new PageSlider($('body'));

    /**
     * Load a PageView in the given layout.
     */
    AppController.prototype.loadPage = function (layout, pageView) {
        layout.setOptions(pageView.layoutOptions);
        layout.setContentView(pageView);
        this.slider.slidePage(layout.render().$el);
        layout.delegateEvents();
        pageView.delegateEvents();
    };

    return AppController;

});

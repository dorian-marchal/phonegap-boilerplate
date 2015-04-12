/**
 * The object from wich the app controller must inherit.
 * The controller is controlled by the router and manage the different views.
 */
define([
    'jquery',
    'core/utils/PageSlider',
], function ($, PageSlider) {
    'use strict';

    var slider = new PageSlider($('body'));

    var AppController = function() {
        this._init();
    };

    AppController.prototype = {

        useLayouts: [],
        usePages: [],
        layoutForPages: {},

        _init: function() {
            var that = this;

            // Create layout instances
            var Layout = null;
            this.layouts = {};
            for (var key in this.useLayouts) {
                Layout = this.useLayouts[key];
                this.layouts[Layout.prototype.name] = new Layout();
            }

            // Create page instances
            var View = null;
            this.pages = {};
            for (key in this.usePages) {
                View = this.usePages[key];
                this.pages[View.prototype.name] = new View();
            }

            // Associate pages with layouts
            var loadPageMaker = function(layout, page) {
                return function() {
                    that._loadPage(layout, page);
                };
            };

            for (var pageName in this.layoutForPages) {
                var layoutName = this.layoutForPages[pageName];
                this[pageName] = loadPageMaker(that.layouts[layoutName], this.pages[pageName]);
            }
        },

        /**
         * Load a PageView in the given layout.
         */
        _loadPage: function (layout, pageView) {
            layout.setOptions(pageView.layoutOptions);
            layout.setContentView(pageView);
            slider.slidePage(layout.render().$el);
            layout.delegateEvents();
            pageView.delegateEvents();
        },

    };

    AppController.extend = function(newProps) {

        var Child = function() {
            AppController.apply(this, arguments);
        };
        Child.prototype = $.extend(true, {}, AppController.prototype, newProps);
        Child.prototype.constructor = Child;

        return Child;
    };

    return AppController;

});

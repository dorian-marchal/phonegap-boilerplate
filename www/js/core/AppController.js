/**
 * The object from wich the app controller must inherit.
 * The controller is controlled by the router and manage the different views.
 */
define([
    'globals',
    'jquery',
    'core/utils/PageSlider',
], function (globals, $, PageSlider) {
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
                    // We pass the action arguments to page.beforeRender
                    page.beforeRender.apply(page, arguments);
                    that._loadPage(layout, page);
                };
            };

            for (var actionName in this.pageForActions) {
                var pageName = this.pageForActions[actionName].page;
                var layoutName = this.pageForActions[actionName].layout;
                this[pageName] = loadPageMaker(that.layouts[layoutName], this.pages[pageName]);
            }
        },

        /**
         * Load a Page in the given layout.
         */
        _loadPage: function (layout, page) {
            layout.setPage(page);
            slider.slidePage(layout.render().$el, function(wasFirstSlide) {

                // Lets the UI thread breathe a little before calling afterRender
                setTimeout(function() {
                    page.afterRender();
                }, 0);

                // If we just rendered the first page, we hide the splashscreen
                if (wasFirstSlide) {

                    setTimeout(function() {

                        // Force reflow before hiding the splashscreen.
                        /*jshint -W030*/
                        layout.el.offsetHeight;

                        // Hide the splashscreen
                        navigator.splashscreen.hide();

                    }, globals.config.splashScreenMinimumDurationMs);
                }
            });
            layout.delegateEvents();
            page.delegateEvents();
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

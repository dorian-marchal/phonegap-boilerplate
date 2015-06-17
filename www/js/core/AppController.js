/**
 * The object from wich the app controller must inherit.
 * The controller is controlled by the router and manage the different views.
 */
define([
    'globals',
    'backbone',
    'jquery',
], function (globals, Backbone, $) {
    'use strict';

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

                return function () {

                    var actionArguments = Array.prototype.slice.call(arguments);

                    that._loadPage(layout, page, actionArguments);
                };
            };

            // Convert this.pageForActions to controller actions
            for (var actionName in this.pageForActions) {
                var pageName = this.pageForActions[actionName].page;
                var layoutName = this.pageForActions[actionName].layout;

                if (!this.pages[pageName]) {
                    console.error('Unknown page in Controller: ' + pageName);
                }
                else if (!this.layouts[layoutName]) {
                    console.error('Unknown layout in Controller: ' + layoutName);
                }
                else {
                    this[pageName] = loadPageMaker(this.layouts[layoutName], this.pages[pageName]);
                }
            }
        },

        /**
         * Load a Page in the given layout.
         * @param {AppLayout} layout         The layout of the page
         * @param {AppPage} page           The page to load
         * @param {Array} actionArguments The arguments passed to the controller
         *    action. (controller, action, params)
         */
        _loadPage: function (layout, page, actionArguments) {

            var oldPage = globals.currentPage;
            var slider = globals.router.slider;
            var slideOrigin = slider.getNextSlideOrigin();

            var history = 'first';
            if (slideOrigin) {
                history = slideOrigin === 'right' ? 'forward' : 'back';
            }

            // We call oldPage.beforeLeave before leaving the page...
            if (oldPage) {
                oldPage.beforeLeave();
            }

            // ...and page.beforeLoad before loading the page
            page.beforeLoad.call(page, {
                actionArguments: actionArguments || [],
                history: history,
            });

            layout.setPage(page);
            layout.render();
            layout.$el.addClass(page.name);

            slider.slidePage(layout.$el, {

                beforeTransition: function() {
                    page.afterRender();

                    // Switch the fixed element to absolute positionning
                    // To prevent odd behaviour during transition
                    $('[data-fixed]').attr('data-fixed', 'absolute');
                },
                afterTransition: function(wasFirstSlide) {

                    // Switch back the fixed elements (only for the new page)
                    layout.$('[data-fixed]').attr('data-fixed', 'fixed');

                    // Remove the "clicked" state of the clickable elements
                    layout.$('[data-clickable]').attr('data-clickable', '');

                    globals.currentPage = page;

                    // Lets the UI thread breathe a little before calling afterLoad
                    setTimeout(function() {
                        page.afterLoad();
                    }, 0);

                    // If we just rendered the first page, we hide the splashscreen
                    if (wasFirstSlide) {

                        setTimeout(function() {

                            // Force reflow before hiding the splashscreen.
                            /*jshint -W030*/
                            layout.el.offsetHeight;

                            // Hide the splashscreen
                            navigator.splashscreen.hide();

                        }, 500); // 500ms safety to prevent splashscreen flickering
                    }
                },
            });
            layout.delegateEvents();
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

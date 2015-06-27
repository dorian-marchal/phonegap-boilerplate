/**
 * A base layout. All the layouts of the application must inherit AppLayout.
 *
 * Example :
 *
 * ```js
 * define(function (require) {
 *     'use strict';
 *     var AppLayout = require('core/views/AppLayout');
 *
 *     return AppLayout.extend({
 *         name: 'simpleLayout',
 *         template: require('text!app/templates/SimpleLayout.html'),
 *         defaultOptions: {
 *             title: 'DefaultTitle',
 *         },
 *         render: function() {
 *             AppLayout.prototype.render.apply(this, arguments);
 *             return this;
 *         },
 *     });
 * });
 * ```
 *
 * @class AppLayout
 */
define([
    'globals',
    'jquery',
    'underscore',
    '__',
    'core/views/AppView',
], function (globals, $, _, __, AppView) {
    'use strict';

    return AppView.extend({

        /**
         * @member {String} name A unique string to identify the layout in the controller.
         */
        name: '',

        /**
         * @member {String} template Underscore template of the layout.
         * This template must have an element with the class .content that
         * will become the AppPage element node.
         * It will be compiled to `this.tpl` at init.
         */
        template: null,

        /**
         * @member {Object} subviews List of AppView that will be linked to the given selector.
         * Example :
         *
         * ```js
         * subviews: {
         *     // At render, MyViewClass will be rendered in the `.selector` node
         *     '.selector' : MyViewClass, // Must inherit AppView
         * }
         * ```
         */
         subviews: {},

        /**
         * @member {Object} defaultOptions Default layout options that can be overriden by the pages
         */
        defaultOptions: {},

        subviewInstances: {},

        initialize: function () {
            AppView.prototype.initialize.apply(this, arguments);
            this.tpl = _.template(this.template);

            // Create subview instances in this.subviewInstances
            for (var selector in this.subviews) {
                var Subview = this.subviews[selector];
                this.subviewInstances[selector] = new Subview();
            }

            this.events = this.events || {};

            // Some default events
            $.extend(this.events, {
                'click [data-history]' : function(event) {
                    event.preventDefault();
                    history.back();
                },
                'click [data-route]' : function(event) {
                    event.preventDefault();
                    globals.router.navigate($(event.currentTarget).attr('data-route'), true);
                },
                'click [data-clickable]' : function(event) {

                    var $el = $(event.currentTarget);
                    var currentState = $el.attr('data-clickable');

                    if (currentState === 'false') {
                        return;
                    }
                    // When "auto", the clicked state is dismissed
                    else if (currentState === 'auto') {
                        setTimeout(function () {
                            $el.attr('data-clickable', 'auto');
                        }, 600);
                    }
                    $el.attr('data-clickable', 'clicked');
                },
            });
        },

        /**
         * Merge the given options with the default layout options
         */
        _loadPageOptions: function(options) {
            // Reset the options first (add __ for i18n)
            this.options = {
                __: __,
            };

            $.extend(this.options, this.defaultOptions, options);
        },

        /**
         * Set the layout page view and populate the layout options with
         * the page "layoutOptions" property.
         * This Page is rendered in the '.content' element of the layout template.
         * @param {Page} page Layout content
         * @private
         */
        setPage: function(page) {
            this.page = page;
            this._loadPageOptions(page.layoutOptions);
            this.subviewInstances['.content'] = page;
        },

        /**
         * Render the page and the subviews
         * @private
         */
        render: function() {
            $('title').html(this.options.title);

            this.$el = $(this.tpl(this.options));

            // Append the subviews in their given selectors
            for (var selector in this.subviewInstances) {
                var subview = this.subviewInstances[selector];
                subview.options = this.options;
                this.assign(subview, selector);
            }

            return this;
        },

    });

});

/**
 * A base layout. All the layouts of the application must inherit AppLayout.
 *
 * The child layout must have these properties :
 * - template : not yet compiled template. Will be compiled in this.tpl at init
 *
 * The child layout may have these properties :
 * - defaultOptions : layout default options (overridable by PageView)
 */
define([
    'jquery',
    'underscore',
    '__',
    'core/views/AppView',
], function ($, _, __, AppView) {
    'use strict';

    return AppView.extend({

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
        },

        /**
         * Merge the given options with the default layout options
         */
        _loadPageViewOptions: function(options) {
            // Reset the options first (add __ for i18n)
            this.options = {
                __: __,
            };

            $.extend(this.options, this.defaultOptions, options);
        },

        /**
         * Set the layout page view and populate the layout options with
         * the page "layoutOptions" property.
         * This PageView is rendered in the '.content' element of the layout template.
         * @param {PageView} pageView Layout content
         */
        setPageView: function(pageView) {
            this.pageView = pageView;
            this._loadPageViewOptions(pageView.layoutOptions);
        },

        /**
         * Render the pageView and the subviews
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

            this.$el.find('.content').html(this.pageView.render().$el);

            return this;
        },

    });

});

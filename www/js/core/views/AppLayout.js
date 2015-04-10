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

        initialize: function () {
            AppView.prototype.initialize.apply(this, arguments);
            this.tpl = _.template(this.template);
        },

        /**
         * Merge the given options with the default layout options
         */
        setOptions: function(options) {
            // Reset the options first (add __ for i18n)
            this.options = {
                __: __,
            };

            $.extend(this.options, this.defaultOptions, options);
        },

        /**
         * Set the layout content view.
         * This view is rendered in the '.content' element of the layout template.
         * @param {AppView} contentView Layout content
         */
        setContentView: function(contentView) {
            this.contentView = contentView;
        },
    });

});

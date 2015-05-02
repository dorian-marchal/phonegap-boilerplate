/**
 * Helper to slide a new page in the app.
 * Use : https://github.com/ccoenraets/directory-backbone-topcoat-require
 */
define([
    'jquery',
], function ($) {

    'use strict';

    return function PageSlider(container) {

        this.animationsEnabled = true;

        var $currentPage,
            stateHistory = [];

        this.back = function () {
            location.hash = stateHistory[stateHistory.length - 2];
        };

        // Use this function if you want PageSlider to automatically determine
        // the sliding direction based on the state history.
        // afterTransition function is called when the transition ends
        this.slidePage = function ($newPage, options) {

            var l = stateHistory.length;
            var state = location.hash;

            if (l === 0) {
                stateHistory.push(state);
                this.slidePageFrom($newPage, null, options);
                return;
            }
            if (state === stateHistory[l - 2]) {
                stateHistory.pop();
                this.slidePageFrom($newPage, 'page-left', options);
            } else {
                stateHistory.push(state);
                this.slidePageFrom($newPage, 'page-right', options);
            }

        };

        /**
         * Use this function directly if you want to control the sliding direction outside PageSlider
         * @param  {$} $newPage The new page to slide in
         * @param  {String} from Origin of the slide ('page-left', 'page-right', or null)
         * @param  {function} options
         *  beforeTransition: Called before the transition, after the page is added
         *                    to the DOM.
         *   afterTransition: Called when the slide end
         *                    or immediately if there is no transition.
         *                    A boolean is passed to the callback : true if we just slide
         *                    in the very first page.
         *
         */
        this.slidePageFrom = function ($newPage, from, options) {

            options.beforeTransition = options.beforeTransition || $.noop;
            options.afterTransition = options.afterTransition || $.noop;

            // Current page must be removed after the transition
            var $oldPage = $currentPage;
            var firstSlide = !$oldPage;
            var currentScrollPosition = $(window).scrollTop();
            $newPage
                .addClass('page')
                .css('top', currentScrollPosition)
            ;

            container.append($newPage);
            options.beforeTransition();

            // First loaded page (no old page) or no transition
            if (firstSlide || !from || !this.animationsEnabled) {

                // Remove old page if it exists
                if ($oldPage) {
                    $oldPage.remove();
                }

                $newPage.addClass('page-center no-transition');

                $currentPage = $newPage;

                // We call the transition end callback anyway
                options.afterTransition(firstSlide);
                return;
            }

            // Position the page at the starting position of the animation
            $newPage.addClass(from);

            // Shim transitionend if it's not fired
            var shimTransitionEnd = setTimeout(function() {
                onTransitionEnd();
            }, 600);

            $currentPage.one('transitionend webkitTransitionEnd', function () {
                onTransitionEnd();
            });

            // Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
            /*jshint -W030*/
            container[0].offsetWidth;

            // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
            $newPage
                .removeClass('page-left page-right no-transition')
                .addClass('transition page-center');

            $oldPage
                .removeClass('page-center no-transition')
                .addClass('transition ' + (from === 'page-left' ? 'page-right' : 'page-left'));

            $currentPage = $newPage;

            var onTransitionEnd = function () {
                $currentPage
                    .removeClass('transition')
                    .addClass('no-transition')
                    .css('top', 0)
                ;

                var $oldPages = $(container).find('> .page:not(:last)');
                $oldPages.hide();

                // Force reflow.
                container[0].offsetWidth;

                $oldPages.remove();

                clearTimeout(shimTransitionEnd);
                options.afterTransition(false);
            };
        };

    };

});

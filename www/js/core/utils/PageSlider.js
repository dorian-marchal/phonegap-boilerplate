/**
 * Helper to slide a new page in the app.
 * Use : https://github.com/ccoenraets/directory-backbone-topcoat-require
 */
define([
    'jquery',
], function ($) {

    'use strict';

    return function PageSlider($container) {

        this.transitionsEnabled = true;
        this.transitionDurationMs = 300;

        var $currentPage;
        var stateHistory = [];

        /**
         * Set the the new page position with translate3d
         * @param {jquery} $page          Page that we want to Position
         * @param {String} newLocation    New position ('left', 'right' or 'center' (default))
         * @param {int} yOffset y offset in pixels (useful to keep scroll position on page slide)
         */
        var _setPagePosition = function ($page, newLocation, yOffset) {

            var position = {
                x: '0px',
                y: '0px',
            };

            if (yOffset) {
                position.y = yOffset + 'px';
            }
            if (newLocation === 'left') {
                position.x = '-100%';
            }
            else if (newLocation === 'right') {
                position.x = '100%';
            }
            var transform = 'translate3d(' + position.x + ', ' + position.y + ', 0px)';

            $page.css({
                'webkitTransform': transform,
                'transform': transform,
            });
        };

        /**
         * Enable css transition on the given page.
         */
        var _enableTransitionOnPage = function ($page) {
            $page.css({
                'webkitTransitionDuration': this.transitionDurationMs + 'ms',
                'transitionDuration': this.transitionDurationMs + 'ms',
            });
        };

        /**
         * Disable css transition on the given page.
         */
        var _disableTransitionOnPage = function ($page) {
            $page.css({
                'webkitTransform': 'none',
                'transform': 'none',
                'webkitTransitionDuration': '0s',
                'transitionDuration': '0s',
            });
        };

        /**
         * Disable css transition on page
         */
        this.disableTransitions = function () {
            this.transitionsEnabled = false;
        };

        /**
         * Enable css transition on page
         */
        this.enableTransitions = function () {
            this.transitionsEnabled = true;
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
                this.slidePageFrom($newPage, 'left', options);
            } else {
                stateHistory.push(state);
                this.slidePageFrom($newPage, 'right', options);
            }

        };

        /**
         * Use this function directly if you want to control the sliding direction outside PageSlider
         * @param  {$} $newPage The new page to slide in
         * @param  {String} from Origin of the slide ('left', 'right', or null)
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
            var isFirstPageSlide = !$oldPage;
            var currentScrollPosition = $(window).scrollTop();

            $newPage.addClass('page');
            $container.append($newPage);

            options.beforeTransition();

            // First loaded page (no old page) or no transition
            if (isFirstPageSlide || !from || !this.transitionsEnabled) {

                // Disable transition
                _disableTransitionOnPage($newPage);

                // Remove old page if it exists
                if ($oldPage) {
                    $oldPage.remove();
                }

                $currentPage = $newPage;

                // We call the transition end callback anyway
                options.afterTransition(isFirstPageSlide);
                return;
            }

            // Move the current page at the top
            _setPagePosition($oldPage, 0, -currentScrollPosition);
            window.scrollTo(0, 0);

            // Position the page at the starting position of the animation
            _setPagePosition($newPage, from, 0);

            // Shim transitionend if it's not fired
            var shimTransitionEnd = setTimeout(function() {
                onTransitionEnd();
            }, this.transitionDurationMs + 100);

            $currentPage.one('transitionend webkitTransitionEnd', function () {
                onTransitionEnd();
            });

            // Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
            /*jshint -W030*/
            $container[0].offsetWidth;

            // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation

            _enableTransitionOnPage.call(this, $newPage);
            _enableTransitionOnPage.call(this, $oldPage);

            setTimeout(function () {
                _setPagePosition($newPage, 'center', 0);
                _setPagePosition($oldPage,  (from === 'left' ? 'right' : 'left'), -currentScrollPosition);
                $currentPage = $newPage;
            }, 0);

            var onTransitionEnd = function () {
                _disableTransitionOnPage($currentPage);

                // Force reflow.
                $container[0].offsetWidth;

                $container.find('> .page:not(:last)').remove();

                clearTimeout(shimTransitionEnd);
                options.afterTransition(false);
            };

        };

    };

});

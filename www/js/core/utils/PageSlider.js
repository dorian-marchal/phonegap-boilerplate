/**
 * Helper to slide a new page in the app.
 * Use : https://github.com/ccoenraets/directory-backbone-topcoat-require
 */
define([
    'jquery',
], function ($) {

    'use strict';

    return function PageSlider($container) {

        this.animationsEnabled = true;

        var transitionDurationMs = 1000;
        var $currentPage;
        var stateHistory = [];

        $container.attr('id', 'page-slider-container');

        var setPagePosition = function ($page, newLocation, scrollPosition) {

            var position = {
                x: '0px',
                y: '0px',
            };

            if (scrollPosition) {
                position.y = scrollPosition + 'px';
            }
            if (newLocation === 'page-left') {
                position.x = '-100%';
            }
            else if (newLocation === 'page-right') {
                position.x = '100%';
            }
            var transform = 'translate3d(' + position.x + ', ' + position.y + ', 0px)';

            $page.css({
                'webkitTransform': transform,
                'transform': transform,
            });
        };

        var enableTransitionOnPage = function ($page) {
            $page.css({
                'webkitTransitionDuration': transitionDurationMs + 'ms',
                'transitionDuration': transitionDurationMs + 'ms',
            });
        };

        var disableTransitionOnPage = function ($page) {
            $page.css({
                'webkitTransform': 'none',
                'transform': 'none',
                'webkitTransitionDuration': '0s',
                'transition-duration': '0s',
            });
        };

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
            $newPage.addClass('page');

            $container.append($newPage);

            options.beforeTransition();

            // First loaded page (no old page) or no transition
            if (firstSlide || !from || !this.animationsEnabled) {

                // Remove old page if it exists
                if ($oldPage) {
                    $oldPage.remove();
                }

                $newPage.addClass('page-center');

                $currentPage = $newPage;

                // We call the transition end callback anyway
                options.afterTransition(firstSlide);
                return;
            }

            // Move the current page at the top
            setPagePosition($oldPage, 0, -currentScrollPosition);
            window.scrollTo(0, 0);

            // Position the page at the starting position of the animation
            setPagePosition($newPage, from, 0);

            // Shim transitionend if it's not fired
            var shimTransitionEnd = setTimeout(function() {
                onTransitionEnd();
            }, transitionDurationMs + 100);

            $currentPage.one('transitionend webkitTransitionEnd', function () {
                onTransitionEnd();
            });

            // Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
            /*jshint -W030*/
            $container[0].offsetWidth;

            // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation

            enableTransitionOnPage($newPage);
            enableTransitionOnPage($oldPage);

            setTimeout(function () {
                setPagePosition($newPage, 'page-center', 0);
                setPagePosition($oldPage,  (from === 'page-left' ? 'page-right' : 'page-left'), -currentScrollPosition);
                $currentPage = $newPage;
            }, 200);



            var onTransitionEnd = function () {
                disableTransitionOnPage($currentPage);

                // Force reflow.
                $container[0].offsetWidth;

                $container.find('> .page:not(:last)').remove();

                clearTimeout(shimTransitionEnd);
                options.afterTransition(false);
            };

        };

    };

});

/**
 * Helper to slide a new page in the app.
 * Use : https://github.com/ccoenraets/directory-backbone-topcoat-require
 */
define([
    'jquery',
], function ($) {

    'use strict';

    return function PageSlider(container) {

        var currentPage,
            stateHistory = [];

        this.back = function () {
            location.hash = stateHistory[stateHistory.length - 2];
        };

        // Use this function if you want PageSlider to automatically determine
        // the sliding direction based on the state history.
        // onTransitionEnd function is called when the transition ends
        this.slidePage = function (page, onTransitionEnd) {

            var l = stateHistory.length,
                state = window.location.hash;

            if (l === 0) {
                stateHistory.push(state);
                this.slidePageFrom(page, null, onTransitionEnd);
                return;
            }
            if (state === stateHistory[l - 2]) {
                stateHistory.pop();
                this.slidePageFrom(page, 'page-left', onTransitionEnd);
            } else {
                stateHistory.push(state);
                this.slidePageFrom(page, 'page-right', onTransitionEnd);
            }

        };

        // Use this function directly if you want to control the sliding direction outside PageSlider
        this.slidePageFrom = function (page, from, onTransitionEnd) {

            onTransitionEnd = onTransitionEnd || $.noop;

            container.append(page);

            if (!currentPage || !from) {
                page.attr('class', 'page page-center');
                currentPage = page;
                currentPage.addClass('no-transition');
                return;
            }

            // Position the page at the starting position of the animation
            page.attr('class', 'page ' + from);

            currentPage.one('transitionend webkitTransitionEnd', function (e) {
                $(e.target).remove();
                currentPage.addClass('no-transition');
                onTransitionEnd();
            });

            // Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
            /*jshint -W030*/
            container[0].offsetWidth;

            // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
            page.attr('class', 'page transition page-center');
            currentPage.attr('class', 'page transition ' + (from === 'page-left' ? 'page-right' : 'page-left'));
            currentPage = page;
        };

    };

});

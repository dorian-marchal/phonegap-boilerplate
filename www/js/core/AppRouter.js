/**
 * The object from wich the app router must inherit.
 * Inherit Backbone.Router.
 * @class AppRouter
 */
define([
    'globals',
    'jquery',
    'backbone',
], function (globals, $, Backbone) {
    'use strict';

    return Backbone.Router.extend({

        /**
         * @member {Object} controllers Required controllers
         */
        controllers: {},

        routes: {
            '(:controller)(/:action)(/*params)': 'routeAction',
        },

        /**
         * @member {Object} routes list of Backbone.Router.route bound to actions
         * Can contain :controller, :action and *params.
         *
         * Example :
         *
         * ```js
         * customRoutes: {
         *     '' : 'home',
         *     ':action(/*params)' : 'simpleAction',
         * },
         * simpleAction: function (action, stringParams) {
         *     this.routeAction('ctrl', action, stringParams);
         * }
         * ```
         */
        customRoutes: {},

        initialize: function() {

            var controller = null;

            // Add the child routes
            for (var key in this.customRoutes) {
                this.route(key, this.customRoutes[key]);
            }

            // Load all the controllers
            for (var i in this.uses) {
                controller = new this.uses[i]();
                this.controllers[controller.name] = controller;
            }

        },

        /**
         * Call a controller action
         * @param {String} controller Controller name
         * @param {String} action action name (default: index)
         * @param {String} stringParams List of parameters passed to the action
         *                              separated by '/'
         */
        routeAction: function(controller, action, stringParams) {

            var params = this.extractParams(stringParams);

            // index is the default action
            action = action || 'index';

            // Reset the global route parameters
            globals.route = {};

            // If the controller/action couple exists, we call controller.action(param1, param2, ...)
            // Controller functions that begins with "_" are not actions
            if (typeof this.controllers[controller] !== 'undefined' &&
                action.charAt(0) !== '_' &&
                action !== 'extend' &&
                typeof this.controllers[controller][action] === 'function') {
                this.callAction(controller, action, params);
            }
            else {
                this.unknownRoute(controller + '.' + action + '(' + params.join(', ') + ')');
            }
        },

        /**
         * Call a controller action. Call this.unknownRoute if the action is not found.
         * @param {String} controller Controller name
         * @param {String} action Action name
         * @param {Array} params List of parameters
         */
        callAction: function(controller, action, params) {

            params = params || [];

            // Set the globals.route parameter
            globals.route = {
                controller: controller,
                action: action,
                params: params,
            };

            if (typeof this.controllers[controller] !== 'undefined' &&
                typeof this.controllers[controller][action] !== 'undefined') {
                this.controllers[controller][action].apply(this.controllers[controller], params);
            }
            else {
                this.unknownRoute(controller + '.' + action + '(' + params.join(', ') + ')');
            }
        },

        /**
         * Called when no matching routes is found
         * @param {String} other controller.action(param1, param2, ...)
         */
        unknownRoute: function(other) {
            console.error('Unknown route : ' + other);
        },

        /**
         * Convert stringParams string in array of parameters
         * @param  {String} stringParams List of parameters separated by '/'
         * @return {Array} Parameters list
         */
        extractParams: function(stringParams) {
            var params = [];

            if (stringParams) {
                var arrayParams = stringParams.split('/');

                for (var i in arrayParams) {
                    var param = arrayParams[i];

                    // We don't keep empty params
                    if (param) {
                        params.push(param);
                    }
                }
            }

            return params;
        },

        setSlider: function(slider) {
            this.slider = slider;
        },
    });

});

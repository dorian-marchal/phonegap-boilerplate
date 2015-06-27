/**
 * A base model.
 * All the app models must inherit from this.
 * The general code of the models goes here.
 *
 * Example :
 *
 * ```js
 * define([
 *     'core/models/AppModel',
 * ], function(AppModel) {
 *     'use strict';
 *     return AppModel.extend({
 *         route: '/deals',
 *     });
 * });
 * ```
 *
 * @class AppModel
 */
 define([
    'globals',
    'backbone',
], function (globals, Backbone) {
    'use strict';

    return Backbone.Model.extend({

        /**
         * @member {String} route The API route
         */
        route: '',

        initialize: function() {
            this.url = 'http://' + globals.config.server.host + ':' + globals.config.server.port + this.route;
        },
    });

});

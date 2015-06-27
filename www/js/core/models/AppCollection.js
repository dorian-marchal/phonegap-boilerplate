/**
 * A base collection.
 * All the app collections must inherit from this.
 * The general code of the collections goes here.
 *
 * Example :
 *
 * ```js
 * define([
 *     'core/models/AppCollection',
 *     'app/models/Deal'
 * ], function(AppCollection, Deal) {
 *     'use strict';
 *
 *     return AppCollection.extend({
 *         route: '/deals',
 *         model: Deal,
 *     });
 * });
 * ```
 *
 * @class AppCollection
 */
define([
    'globals',
    'backbone',
], function (globals, Backbone) {
    'use strict';

    return Backbone.Collection.extend({

        /**
         * @member {String} route The API route
         * <br>
         */
        route: '',

        /**
         * @member {AppModel} model Model in the collection
         * <br>
         */
        model: null,

        initialize: function() {
            this.url = 'http://' + globals.config.server.host + ':' + globals.config.server.port + this.route;
        },
    });

});

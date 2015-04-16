/**
 * Singleton used to manage the server API.
 */
define([
    'globals',
    'core/utils/ApiHelper',
], function (globals, ApiHelper) {

    'use strict';

    return new ApiHelper(globals.config.server.host, globals.config.server.port);
});

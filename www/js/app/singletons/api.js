/**
 * Singleton used to manage the server API.
 */
define([
    'config',
    'core/utils/ApiHelper',
], function (config, ApiHelper) {

    'use strict';

    return new ApiHelper(config.server.host, config.server.port);
});

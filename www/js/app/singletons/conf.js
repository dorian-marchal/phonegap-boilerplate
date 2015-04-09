/**
 * Singleton used to get the app configuration.
 */
define([
    'core/core-require-conf',
    'core',
    'config',
], function (coreConfig, appCoreConfig, appConfig) {

    'use strict';

    appCoreConfig.paths = appCoreConfig.paths || {};
    appCoreConfig.shim = appCoreConfig.shim || {};

    for (var key in appCoreConfig.paths) {
        coreConfig.paths[key] = appCoreConfig.paths[key];
    }

    for (key in appCoreConfig.shim) {
        coreConfig.shim[key] = appCoreConfig.shim[key];
    }

    for (key in appCoreConfig) {
        if (key !== 'shim' && key !== 'paths') {
            coreConfig[key] = appCoreConfig[key];
        }
    }

    for (key in appConfig) {
        coreConfig[key] = appConfig[key];
    }

    return coreConfig;
});

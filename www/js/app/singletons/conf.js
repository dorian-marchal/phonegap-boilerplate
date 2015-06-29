/**
 * Singleton used to get the app configuration.
 * This module return the merge of all the config files :
 * - js/core/core-require-conf.js : Phonegap Boilerplate core conf
 *   (checked in version control)
 * - js/core.js : Application core config (checked in version control)
 * - js/config.js : The environment config  (not checked in version control)
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

    // Merge only the selected environment configuration
    for (key in appConfig.environmentConfig[appConfig.environment]) {
        coreConfig[key] = appConfig.environmentConfig[appConfig.environment][key];
    }
    coreConfig.environment = appConfig.environment;

    return coreConfig;
});

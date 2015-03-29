/**
 * Singleton used to manage the user authentification.
 */
define([
    'core/utils/AuthHelper',
    'app/singletons/api',
], function (AuthHelper, api) {

    'use strict';

    return new AuthHelper(api);
});

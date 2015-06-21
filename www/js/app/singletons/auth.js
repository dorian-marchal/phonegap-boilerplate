/**
 * Singleton used to manage the user authentication.
 */
define([
    'core/utils/AuthHelper',
    'app/singletons/api',
], function (AuthHelper, api) {

    'use strict';

    return new AuthHelper(api);
});

define([
    'jquery',
    'core/AppController',
], function ($, AppController) {
    'use strict';

    var Controller = function() {};

    Controller.prototype = new AppController();

    return Controller;

});

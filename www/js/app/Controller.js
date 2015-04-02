define([
    'jquery',
    'core/AppController',
    'app/views/Layout',
    'app/views/Home',
], function ($, AppController, LayoutView, HomeView) {
    'use strict';

    var Controller = function() {};

    Controller.prototype = new AppController();

    Controller.prototype.layout = new LayoutView();
    Controller.prototype.homeView = new HomeView();

    Controller.prototype.home = function () {
        this.loadPage(this.layout, this.homeView);
    };

    return Controller;

});

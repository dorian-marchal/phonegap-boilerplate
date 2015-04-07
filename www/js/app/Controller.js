define([
    'jquery',
    'core/AppController',
    'app/views/Layout',
    'app/views/Home',
    'app/views/Territory',
], function ($, AppController, LayoutView, HomeView, TerritoryView) {
    'use strict';

    var Controller = function() {};

    Controller.prototype = new AppController();

    Controller.prototype.layout = new LayoutView();
    Controller.prototype.homeView = new HomeView();
    Controller.prototype.territoryView = new TerritoryView();

    Controller.prototype.home = function () {
        this.loadPage(this.layout, this.homeView);
    };

    Controller.prototype.territory = function () {
        this.loadPage(this.layout, this.territoryView);
    };

    return Controller;

});

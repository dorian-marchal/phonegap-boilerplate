## Add a Page

To add a new page to your application, you must follow these steps :

1. Create the page view and the template

   Page views are `Backbone.Views` that inherit `AppPage` and are located in `app/views`.
   A page is often associated with a template located in `app/templates`

   Exemple (`app/views/Home.js`) :

   ```js
   define([
       'jquery',
       'underscore',
       'core/views/AppPage',
       'text!app/templates/Home.html',
   ],function ($, _, AppPage, template) {
       'use strict';

       // A page inherit ApPage
       return AppPage.extend({

           // Used in controller configuration
           name: 'nextPage',

           // A class added to the view element
           className: 'container',

           // These options will override the layout's one
           layoutOptions: {
               title: 'Home'
           },

           // Called when the view is instanciated
           initialize: function () {
               AppPage.prototype.initialize.apply(this, arguments);
               this.tpl = _.template(template);
           },

           // Called each time the page is displayed
           render: function () {
               this.$el.html(this.tpl());
               return this;
           },

           // Called  right after the page transition
           transitionEnd: function() {}

       });
   });
   ```
2. 

- template / tpl
- subviews
- options

## Configure a Controller

Controller methods (actions) are meant to be called directly by the router.
A controller makes the connection between a [`Layout`](layout.md) and a `Page`.

__Add a controller:__

Controllers must be created in `app/controllers` directory. A controller looks like that :

```js
define(function(require) {
    'use strict';
    // A controller must extend the AppController
    var AppController = require('core/AppController');

    return AppController.extend({

        name: 'ctrl', // This property is used a the first part of the route

        // The layouts that will be used in this controller
        useLayouts: [
            require('app/views/Layout'),
        ],

        // The Pages that will be used in this controller
        usePages: [
            require('app/views/Login'),
            require('app/views/Home'),
            require('app/views/NextPage'),
            require('app/views/Map'),
        ],
        

        // Define a Layout/Page couple for each action
        // The strings used for the 'page' and 'layout' properties
        // are the `name` properties of, respectively, the Page
        // and the Layout
        pageForActions: {
            login: { // The 'login' action ...
                page: 'login', // ... will render the 'login' Page ...
                layout: 'layout', // ... in the 'layout' Layout.
            },
        },
    });
});

```

Generally, the `pageForActions` property is good enough but you may want to add actions manually. All the methods of the controller are converted to routes, unless it begins with a `_`.
If you want to know more, you can [look at the code](../www/js/core/AppController.js).

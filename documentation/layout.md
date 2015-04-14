## Configure a Layout

Layouts inherit the `AppLayout` class.

A layout is associated with a template and looks like that :

```js
define(function (require) {
    'use strict';

    var AppLayout = require('core/views/AppLayout');

    return AppLayout.extend({

        // Used in the controller configuration (pageForActions)
        name: 'layout',

        // Template rendered by the layout.
        // Will be compiled in the `tpl` property
        template: require('text!app/templates/Layout.html'),

        // This property is used to link subviews (AppView) with the layout
        // On layout render, these views will be rendered in their associated
        // elements (in the layout template)
        subviews: {
            '.header' : require('app/views/Header'),
            '.footer' : require('app/views/Footer'),
        },

        // Default options overridable by the Pages
        defaultOptions: {
            title: 'My page title',
        },

    });

});

```

On layout render, the current [`Page`](page.md) will be rendered in the `.content` element of the template.


[[Back to index documentation](index.md)]

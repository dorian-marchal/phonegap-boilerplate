## Configure the router

__Default route:__

The router manages a default route : `controllerName/action/param1/param2/...`.

This route calls `router.callAction(controllerName, action, params)` who calls the `action` method of the Controller with the name property equals to `controllerName` if it exists.
If there is no action in the route (for example, `#contact`), the `index` action is called.

For a controller action to be called, the controller must be registered in the router :

```js
uses: [
    ContactController, //register contact controller
],
```

Moreover, the Controller `name` property must be set and the `controller[action]` method must exists.


When a route is called automatically or via the `router.callAction` method, the `router` property of the [`globals` singleton](globals.md) is set :

```js
globals.route = {
    controller: controller,
    action: action,
    params: params,
};
```

__Custom routes:__

You can add custom routes in your router (`app/singletons/router.js`), by adding them in the `customRoutes` property. These routes will be added bedore the default one.

For example, you can add a route to handle a home page :

```js
// An empty route will call the 'home' method of the
// controller named 'crtl'
customRoutes: {
    ':action(/*params)' : 'simpleAction',
},

home: function() {
    this.callAction('ctrl', 'home');
},
```

Or an other to avoid the need to add the controller name in the route :

```js
// This route will override the default route (match everything)
customRoutes: {
    ':action(/*params)' : 'simpleAction',
},

simpleAction: function(action, stringParams) {
    // Route action call `router.callAction` if a route is found
    this.routeAction('ctrl', action, stringParams);
},
```

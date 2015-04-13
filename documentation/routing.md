# Routing

Default routing works this way :

```
Router
|
|- Detect #hash change
|- Store `controller`, `action` and `params` in
     the `route` property of the `globals` singleton.
|- Pass the request to the proper controller/action with given parameters
v

Controller
|
|- Associate the relevant `PageView` with its layout
|- Notify the layout that it must be rendered
v

Layout
|
|- `Layout.defaultOptions` properties are overriden by
     `PageView.layoutOptions` if needed
|- Render with its `PageView` and `subviews` as content
v

PageSlider
|
|- Slide the layout rendered element as a new page
v

Layout
|
|- After the slide transition, the `pageView.transitionEnd` method is called
```

__Exemple :__

1 . The route `/#/contact/show/14` is called.

```js
// In the router :
uses: [
    ContactController,
],
```

```js
// In the ContactController :
name: 'contact', // used in the route

// At Controller init, a new Layout instance will be added to the
// "layouts" Controller property
useLayouts: [
    require('app/views/Layout'),
],

// At Controller init, a new Show instance will be added to the
// "pages" Controller property
usePages: [
    require('app/views/Show'),
],

// PageViews in "layoutForPages" are automatically associated with
// their layout. For example, here, this action is created :
// ContactController.show: function() {
//     this._loadPage(this.layouts.layout, this.pages.contactShow);
// }
// (Note that "layout" is the Layout name, and "contactShow", the PageView name)
layoutForPages: {
    show: {
        page: 'contactShow',
        layout: 'layout',
    }
},

```

2 . The router calls the method `ContactController.show(14)`

In this case, the action parameter ( `14`) is useless, but the route params are also available in the `route` property of the `globals` singleton.
Since it has not been overrided, the action do the following :
- Set the content view of the layout with `layout.setPageView()`
- Render the layout : `layout.render()`
- Slide the layout element as a new page : `pageSlider.slidePage(layout.$el)`
- Delegate the layout and page events

3 . The layout is rendered

The layout, its subviews and the pageView are rendered.

4 . pageView.transitionEnd

Once the transition is ended (or immediatly, if this is the first loaded page), the `pageView.transitionEnd` method is called.
Useful to execute some code after the rendering, without interrupting the transition.


[[Back to index documentation](index.md)]

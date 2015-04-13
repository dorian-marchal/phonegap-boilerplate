# Routing

Routing works this way :

```
Router (detect #hash change)
-> Pass the request to the proper controller/action
Controller
-> Associates the relevant `PageView` in its layout
-> Notify the page that it must be rendered
PageView
-> Render in its layout


Phonegap Boilerplate creates the most of your routes automatically.

[[Back to index documentation](index.md)]

# `globals` singleton

The `globals` module (`app/singletons/globals`) is a singleton where all the global app data are stored.

### - `globals.config`

Application configuration (merge of `app/config.js`, `app/core.js` and `core/core-require-conf.js`)

### - `globals.router`

`Backbone.Router` of the application.

### - `globals.route`

Current route params (`controller`, `action` and `params`).

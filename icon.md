# Generating an icon/splashscreen

Phonegap Boilerplate allow easy customization of app icon and splashscreen.

To change your app icon/splashscreen, you must add :
- `resources/icon.png` (1024 x 1024)
- `resources/splash.png` (2208 x 2208)

Then, you can run `make generate-resources`.

All resources are automatically generated, juste use `make build` to build your changes.

__Note :__ Dev dependencies are required (`make install-dev`).

### Based on

- [org.apache.cordova.splashscreen](https://github.com/apache/cordova-plugin-splashscreen)
- [ionic](https://github.com/driftyco/ionic)

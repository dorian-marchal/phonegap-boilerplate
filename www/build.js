({
    baseUrl: '',

    paths: {
        cordova: 'empty:', // Cordova path depends on the target platform
        config: 'js/config',
        core: 'js/core',
        app: 'js/app',
        globals: 'js/app/singletons/globals',
        __: 'js/app/singletons/i18n',
        jquery: 'js/lib/jquery.min',
        backbone: 'js/lib/backbone',
        underscore: 'js/lib/underscore-min',
        text: 'js/lib/text',
        fastclick: 'js/lib/fastclick',
        domReady: 'js/lib/domReady',
        async: 'js/lib/async',
        i18next: 'js/lib/i18next',
        gm_async: 'js/lib/gm_async',
        gmaps: 'js/lib/gmaps',
        pageslider: 'js/lib/page-slider.min',
        google_maps: 'http://maps.google.com/maps/api/js?sensor=true',
        moment: 'js/lib/moment',
        spinner: 'js/lib/spin',
    },

    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        i18next: {
            exports: 'i18n'
        },
        gmaps: {
            deps: [
                'gm_async!google_maps',
            ],
            exports: 'GMaps'
        },
    },

    mainConfigFile : 'js/app.js',
    name: 'app',
    out: 'dist/main.js',
    removeCombined: true,
    findNestedDependencies: true,
    preserveLicenseComments: false,
    wrapShim: true,
})

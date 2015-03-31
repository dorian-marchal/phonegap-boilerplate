({
    baseUrl: '',

    paths: {
        core: 'js/core',
        app: 'js/app',
        jquery: 'bower_components/jquery/dist/jquery.min',
        backbone: 'bower_components/backbone/backbone',
        underscore: 'bower_components/underscore/underscore-min',
        text: 'bower_components/text/text',
    },

    shim : {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
    },

    mainConfigFile : 'js/app.js',
    name: 'app',
    out: 'dist/main.js',
    removeCombined: true,
    findNestedDependencies: true,
    preserveLicenseComments: false,
})


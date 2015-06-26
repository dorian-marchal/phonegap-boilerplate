'use strict';
/* jshint node:true */

var gulp  = require('gulp');
var plumber = require('gulp-plumber');

var webrootPath = 'www';
var cssPath = webrootPath + '/css';
var sassPath = cssPath + '/sass';
var jsPath = webrootPath + '/js';

var jsdoxInputFolders = [
    'www/js/core/AppController.js',
    'www/js/core/AppRouter.js',
    'www/js/core/models',
    'www/js/core/singletons',
    'www/js/core/utils',
    'www/js/core/views',
];
var jsdoxOutputFolder = 'documentation/api';

var tinylr;
var lrPort = 35729;

var lrWatchPaths = [
    cssPath + '/*.css',
    jsPath + '/app/templates/*.html',
    jsPath + '/app/views/*.js',
];

function notifyLiveReload(event) {
    var fileName = require('path').relative(__dirname, event.path);

    tinylr.changed({
        body: {
          files: [ fileName ]
        }
    });
}

gulp.task('default', ['live']);

gulp.task('live', ['livecompass', 'livereload']);

gulp.task('livereload', function () {
    tinylr = require('tiny-lr')();
    tinylr.listen(lrPort);

    for (var i in lrWatchPaths) {
        gulp.watch(lrWatchPaths[i], notifyLiveReload);
    }
});

gulp.task('livecompass', function () {
    gulp.watch(sassPath + '/*.scss', ['compass']);
});

gulp.task('compass', function () {

    var compass = require('gulp-compass');

    gulp.src(sassPath + '/*.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: sassPath + '/config.rb',
            css: cssPath,
            sass: sassPath,
        }))
        .pipe(gulp.dest(cssPath));
});

gulp.task('jsdox', function () {
    var jsdox = require('jsdox');

    for (var i = 0; i < jsdoxInputFolders.length; i++) {
        jsdox.generateForDir(jsdoxInputFolders[i], jsdoxOutputFolder, null, function () {});
    }
});

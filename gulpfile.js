'use strict';

var gulp  = require('gulp');

var webrootPath = 'www';
var cssPath = webrootPath + '/css';
var sassPath = cssPath + '/sass';
var jsPath = webrootPath + '/js';

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
        .pipe(compass({
            config_file: sassPath + '/config.rb',
            css: cssPath,
            sass: sassPath,
        }))
        .pipe(gulp.dest(cssPath));
});

'use strict';

var gulp  = require('gulp');

var tinylr;
var lrPort = 35729;

var lrWatchPaths = [
    'www/css/*.css',
    'www/js/app/templates/*.html',
    'www/js/app/views/*.js',
];

function notifyLiveReload(event) {
    var fileName = require('path').relative(__dirname, event.path);

    tinylr.changed({
        body: {
          files: [ fileName ]
        }
    });
}

gulp.task('livereload', function() {
    tinylr = require('tiny-lr')();
    tinylr.listen(lrPort);

    for (var i in lrWatchPaths) {
        gulp.watch(lrWatchPaths[i], notifyLiveReload);
    }
});

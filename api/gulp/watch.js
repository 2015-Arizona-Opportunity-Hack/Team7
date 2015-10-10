'use strict';

var gulp = require('gulp'),
  gls = require('gulp-live-server');

module.exports = function(options) {
  gulp.task('watch', function () {
    gulp.watch([
      options.src + '/**/*.js',
      options.config + '/**/*.js',
      options.config + '/**/*.json'
    ], function() {
      gulp.start('scripts');
      gls.start();
    });
  });
};

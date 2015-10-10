'use strict';

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  gls = require('gulp-live-server');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('scripts', function () {
    return gulp.src(options.src + '/**/*.js')
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe(gls.server ? gls.server.notify({ stream: true }) : gutil.noop())
      .pipe($.size());
  });
};

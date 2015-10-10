'use strict';

var gulp = require('gulp'),
  gls = require('gulp-live-server');

module.exports = function(options) {
  gulp.task('serve', ['watch'], function() {
    gls.new('app.js').start();
  });
};

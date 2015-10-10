'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'uglify-save-license', 'del']
});

module.exports = function(options) {
  gulp.task('config', ['clean'], function() {
    return gulp.src([
      options.config + '/**/*'
    ])
      .pipe(gulp.dest(options.dist + '/' + options.config));
  });

  gulp.task('ssl', ['clean'], function() {
    return gulp.src([
      options.tmp + '/ssl/**/*'
    ])
      .pipe(gulp.dest(options.dist + '/' + options.tmp + '/ssl/'));
  });

  gulp.task('other', ['clean'], function() {
    return gulp.src([
      'package.json',
      'app.js',
      'process.json'
    ])
      .pipe(gulp.dest(options.dist + '/'));
  });

  gulp.task('clean', function(done) {
    $.del([options.dist + '/'], done);
  });

  gulp.task('build', ['config', 'ssl', 'other']);
};

'use strict';

var gulp = require('gulp'),
runSequence = require('run-sequence').use(gulp),
path = require('path'),
spawn = require('child_process').spawn,
argv = require('yargs')
  .boolean('populate')
  .argv;

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});

module.exports = function(options) {
  gulp.task('env:test', function() {
    process.env.NODE_ENV = 'test';
    process.env.PORT = process.env.PORT || 4000;
  });

  gulp.task('expressTestServer', ['env:test'], function(cb) {
    require(path.join(__dirname, '../app.js'));
    setTimeout(function() { // NOTE : we are waiting for the express app to start
      cb();
    }, 1500);
  });

  gulp.task('mochaTest', ['expressTestServer'], function() {
    var tests = [
      //'test/helpers/prepare.spec.js',
      'test/**/*.spec.js',
      '!test/helpers/*'
    ];

    if (argv.only) {
      tests = ['test/' + argv.only + '.spec.js']
    }

    return gulp.src(tests, {read: false})
      .pipe($.mocha({
        reporter: 'spec'
      }));
  });

  gulp.task('populate-db', ['expressTestServer'], function(cb) {
    var mongoose = require('mongoose');
    var folder = path.join('test/helpers/', 'dump./' + mongoose.connection.name);
    var args = [
      '--host', mongoose.connection.host,
      '--port', mongoose.connection.port,
      '--db', mongoose.connection.name,
      '--username', mongoose.connection.user,
      '--password', mongoose.connection.pass,
      '--drop',
      folder
    ];
    var mongorestore = spawn('mongorestore', args);
    mongorestore.stdout.on('data', function(data) {
      console.log('stdout: ' + data);
    });
    mongorestore.stderr.on('data', function(data) {
      console.log('stderr: ' + data);
    });
    mongorestore.on('exit', function(code) {
      console.log('mongorestore exited with code ' + code);
      if (code !== 0) {
        throw 'Failed to do a mongorestore';
      }
      cb()
    });
  });

  gulp.task('test', function(cb) {
    if (argv['populate']) {
      runSequence('populate-db', 'mochaTest', function() {
        cb();
        process.exit(0);
      });
    } else {
      runSequence('mochaTest', function () {
        cb();
        process.exit(0);
      });
    }
  });
};

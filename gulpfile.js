var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');
var changed = require('gulp-changed');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('lint', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // .pipe(jshint.reporter('fail'))
    .on('error', gutil.log)
    ;
});

gulp.task('less', function() {
  // need to minify css
  return gulp.src('src/less/style-custom.less')
    .pipe(changed('assets/css'))
    .pipe(less())
    .pipe(gulp.dest('assets/css'))
    .on('error', gutil.log)
    ;
});

gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .on('error', gutil.log)
    ;
});

gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/less/**/*.less', ['less']);
});

gulp.task('default', function() {
  gulp.start('lint', 'scripts', 'less', 'watch')
  ;
});
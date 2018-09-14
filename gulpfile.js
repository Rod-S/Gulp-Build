"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del');

gulp.task('scripts', function() {
    return gulp.src([
      'js/circle/autogrow.js',
      'js/circle/circle.js',
      'js/global.js'
    ])
    .pipe(maps.init())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function() {
    return gulp.src("sass/global.scss")
    .pipe(maps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename('all.min.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('clean', function() {
  del(['dist'])
});

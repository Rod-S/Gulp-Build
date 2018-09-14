"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
 smushit = require('gulp-smushit');

gulp.task('scripts', ['clean'], function() {
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

gulp.task('styles' , ['clean'], function() {
    return gulp.src("sass/global.scss")
    .pipe(maps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename('all.min.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('images', ['clean'], function() {
    return gulp.src("images/*.{jpg,png}")
    .pipe(smushit())
    .pipe(gulp.dest('dist/content'))
});

gulp.task('clean', function() {
  del(['dist/**'])
});

gulp.task("build", ['clean', 'scripts', 'styles', 'images']);

gulp.task("default", ["build"]);

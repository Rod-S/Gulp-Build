"use strict";
//node modules/dependencies
var fs = require('fs'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    smushit = require('gulp-smushit'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    rimraf = require('rimraf'),
    del = require('del'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    runSeq = require('run-sequence');

//compile, concat, minify js files with addt'l source map file
//send to /dist/js
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

//compile/concatenate sass to css and minify with addt'l source map file
//send to /dist/css
gulp.task('styles', function() {
    return gulp.src("sass/global.scss")
    .pipe(maps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename('all.min.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
});

//optimize jpg and png images inside /images with smushit()
//send to /dist/content
gulp.task('images', function() {
    return gulp.src("images/*.{jpg,png}")
    .pipe(smushit())
    .pipe(gulp.dest('dist/content'));
});

//watch for changes to scss files in sass folder
//run styles to recompile/reminify when changes detected
//run livereload to refresh browser
gulp.task('watchFiles', function() {
    livereload.reload();
    gulp.watch('sass/**/*.scss', ['styles']);
});

//Remove dist sub-directories for necessary tasks
gulp.task('clean', function() {
    rimraf('dist/*', function() {
    if (fs.existsSync('dist')) {
      del('dist/*');
    }
  });
});

//run and complete clean task; followed by scripts, styles and images in parallel
gulp.task("build", function() {
    return runSeq('clean', ['scripts', 'styles', 'images'], function() {
      console.log('"build" task complete.')
    });
});

//serve app on localhost:3000 with livereload enabled to auto-refresh watchFiles changes
gulp.task("serve", ["images", 'watchFiles'], function() {
    livereload.listen();
    connect.server({
      port:3000,
      livereload: true
    });
});

//default gulp task to run build and serve tasks
gulp.task("default", ["build", "serve"]);

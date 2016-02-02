/**
 * Created by syedf on 1/30/2016.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    del = require('del');
 
gulp.task('js', function () {
    gulp.src(['public/js/app.js','public/js/**/*.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/build'));
});

gulp.task('watch', function () {
    gulp.watch(['public/js/app.js','public/js/**/*.js'], ['js']);
});


gulp.task('clean', function (cb) {
    del(['public/build'], cb);
});

gulp.task('default', ['js', 'watch']);

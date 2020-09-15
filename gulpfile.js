var babel = require("gulp-babel");
var browserSync = require('browser-sync');
var concat = require("gulp-concat");
var gulp = require("gulp");
var reload = browserSync.reload;
var sass = require('gulp-sass');
var sourcemaps = require("gulp-sourcemaps");
var watch = require("gulp-watch");

/**
 * JavaScript source paths to watch.
 * @type {string[]}
 */
var source_paths = [
    'public/js/abstracts/*.js', // Abstracts first, otherwise we might get failures if the base classes are extended
    'public/js/**/*.js',
    'public/js/**/**/*.js',
    'public/js/Application.js'
];

/**
 * SCSS source paths to watch.
 * @type {string[]}
 */
var scss_paths = [
    "scss/*.scss"
];

/**
 * Default task
 */
gulp.task("default", ['build-js', 'build-scss', 'browser-sync'], function () {
    gulp.watch(source_paths, ['build-js']);
    gulp.watch(scss_paths, ['build-scss']);
});

/**
 * Transpile EcmaScript 6 files and output to public/dist/
 */
gulp.task('build-js', function () {
    return gulp
        .src(source_paths)
        .pipe(sourcemaps.init())
        .pipe(concat("all.js"))
        .pipe(babel())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("public/dist/debug"));
});

/**
 * Build SCSS files and output to public/css
 */
gulp.task('build-scss', function () {
    return gulp
        .src(scss_paths)
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
        .pipe(reload({stream: true}));
});

/**
 * Task to start browser-sync
 */
gulp.task('browser-sync', function () {
    browserSync({
        proxy: 'localhost',
        startPath: "/xpwebsocket/public"
    });
});
/*eslint-disable */

var gulp = require('gulp');

//Sass muss ebenfalls als dependency bekannt gemacht werden
var sass = require('gulp-sass');

//Autoprefixer
var autoprefixer = require('gulp-autoprefixer');

//Browsersync
var browserSync = require('browser-sync').create();


gulp.task('default', ['copy-html', 'copy-images', 'styles'], function() {
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch('/index.html', ['copy-html']);
    gulp.watch("./dist/index.html").on('change', browserSync.reload);

    browserSync.init({
        server: './dist/'
    })
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        browser: "google chrome"
    });
    browserSync.stream();
});


gulp.task('copy-html', function(){
    gulp.src('./index.html')
        .pipe(gulp.dest('./dist/'));
})

gulp.task('copy-images', function() {
    gulp.src('img/*')
        .pipe(gulp.dest('./dist/img'))
})

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        // Konvertiert alle in CSS-Files und erzuegt Fehlermeldung bei Fehler ohne verarbeitung abzubrechen
        .pipe(sass().on('error', sass.logError))
        // Autoprefixer über CSS jagen
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});


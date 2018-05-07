var gulp = require('gulp');

//Sass muss ebenfalls als dependency bekannt gemacht werden
var sass = require('gulp-sass');

//Autoprefixer
var autoprefixer = require('gulp-autoprefixer');

//Browsersync
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        browser: "google chrome"
    });
});

gulp.task('default', function() {
    gulp.watch('sass/**/*.scss', ['styles']);
});

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        // Konvertiert alle in CSS-Files und erzuegt Fehlermeldung bei Fehler ohne verarbeitung abzubrechen
        .pipe(sass().on('error', sass.logError))
        // Autoprefixer über CSS jagen
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./css'));
});


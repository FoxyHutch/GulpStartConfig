/*eslint-disable */

var gulp = require('gulp');

//Sass muss ebenfalls als dependency bekannt gemacht werden
var sass = require('gulp-sass');

//Autoprefixer
var autoprefixer = require('gulp-autoprefixer');

//Browsersync
var browserSync = require('browser-sync').create();

//JS-Concat
var concat = require('gulp-concat');

//Uglify
var uglify = require('gulp-uglify');

//Babel
var babel = require('gulp-babel');


gulp.task('default', ['copy-html', 'copy-images', 'styles', 'scripts'], function() {
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch('/index.html', ['copy-html']);
    gulp.watch("./dist/index.html").on('change', browserSync.reload);

    browserSync.init({
        server: './dist/'
    })
});

//Productive Task
gulp.task('dist', [
    'copy-html',
    'copy-images',
    'styles',
    'scripts-dist'
]);

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

gulp.task('scripts', function() {
    gulp.src('./js/**/*.js')
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'));
})

gulp.task('scripts-dist', function() {
    gulp.src('./js/**/*.js')
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
})


gulp.task('copy-html', function(){
    gulp.src('./index.html')
        .pipe(gulp.dest('./dist/'));
})

gulp.task('copy-images', function() {
    gulp.src('img/*')
        .pipe(gulp.dest('./dist/img'))
})

gulp.task('styles', function() {

    // Zwei Möglichkeiten: Alle einzelnd importieren, oder über SASS alle in ein importieren
    //gulp.src('sass/**/*.scss')
    gulp.src('./sass/main.scss')
        // Konvertiert alle in CSS-Files und erzuegt Fehlermeldung bei Fehler ohne verarbeitung abzubrechen
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        // Autoprefixer über CSS jagen
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});


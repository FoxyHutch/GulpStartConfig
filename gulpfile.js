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

//SourceMaps
var sourcemaps = require('gulp-sourcemaps');

//Imagemin
var imagemin = require('gulp-imagemin');

//PNG-Qunatization
var pngquant = require('imagemin-pngquant');

//Image Resize
var imageresize = require('gulp-image-resize');

//Rename
var rename = require('gulp-rename');


gulp.task('default', ['copy-html', 'copy-images', 'styles', 'scripts'], function() {
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch('/index.html', ['copy-html']);
    gulp.watch('./dist/index.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js', ['scripts']);

    browserSync.init({
        server: './dist/',
        browser: "google chrome"
    })
});

//Productive Task
gulp.task('dist', [
    'copy-html',
    'styles',
    'scripts-dist',
    'copy-images-dist'
]);

gulp.task('scripts', function() {
    gulp.src('./js/**/*.js')
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'));
})

gulp.task('scripts-dist', function() {
    gulp.src('./js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
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


//Überarbeitet und kopiert alle Images
gulp.task('copy-images-dist', [
    'copy-images-large',
    'copy-images-medium',
    'copy-images-small'
])

gulp.task('copy-images-large', function() {
    gulp.src('./img/*')
        //Large
        .pipe(imageresize({
            width: 1920,
            upscale: false,
            crop: false,
            imageMagick: true
        }))
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(rename({
            suffix: '_large'
        }))
        .pipe(gulp.dest('./dist/img'))
    });

    gulp.task('copy-images-medium', function() {
        gulp.src('./img/*')
        //Medium
        .pipe(imageresize({
            width: 960,
            upscale: false,
            crop: false,
            imageMagick: true
        }))
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(rename({
            suffix: '_medium'
        }))
        .pipe(gulp.dest('./dist/img'))
    });

    gulp.task('copy-images-small', function() {
        gulp.src('./img/*')
        //Small
        .pipe(imageresize({
            width: 480,
            upscale: false,
            crop: false,
            imageMagick: true
        }))
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(rename({
            suffix: '_small'
        }))
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


var gulp = require('gulp');

//Sass muss ebenfalls als dependency bekannt gemacht werden
var sass = require('gulp-sass');

//Autorefixer
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', defaultTask);

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

function defaultTask(done) {
    console.log("First Gulp-Task")
  done();
}

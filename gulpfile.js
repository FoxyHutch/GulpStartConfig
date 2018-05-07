var gulp = require('gulp');
//Sass muss ebenfalls als dependency bekannt gemacht werden
var sass = require('gulp-sass')

gulp.task('default', defaultTask);

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        // Konvertiert alle in CSS-Files und erzuegt Fehlermeldung bei Fehler ohne verarbeitung abzubrechen
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

function defaultTask(done) {
    console.log("First Gulp-Task")
  done();
}

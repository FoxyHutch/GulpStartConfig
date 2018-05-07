var gulp = require('gulp');

gulp.task('default', defaultTask);

function defaultTask(done) {
    console.log("First Gulp-Task")
  done();
}
/* global watch */

var gulp = require('gulp')

gulp.task('image', function () {
  watch('src/img/**')
    .pipe(gulp.dest('./www/img'))
})

var gulp = require('gulp')
var browserSync = require('browser-sync')

gulp.task('html', function () {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./www/'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

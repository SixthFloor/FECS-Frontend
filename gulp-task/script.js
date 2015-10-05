var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var browserSync = require('browser-sync')

gulp.task('script', function () {
  return gulp.src(['./node_modules/angular/angular.js',
    './node_modules/angular-ui-router/release/angular-ui-router.js',
    './src/js/**/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('./www/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

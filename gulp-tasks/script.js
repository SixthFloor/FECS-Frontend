var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var browserSync = require('browser-sync')

gulp.task('script', function () {
  return gulp.src([
    './bower_components/jquery/dist/jquery.js',
    './bower_components/angular/angular.js',
    './bower_components/angular-local-storage/dist/angular-local-storage.js',
    './bower_components/angular-ui-router/release/angular-ui-router.js',
    './bower_components/angular-notify/dist/angular-notify.js',
    './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    './src/js/**/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('./www/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

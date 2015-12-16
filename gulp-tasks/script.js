var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var browserSync = require('browser-sync')

gulp.task('script', function () {
  return gulp.src([
    './bower_components/jquery/dist/jquery.js',
    './bower_components/moment/moment.js',
    './bower_components/angular/angular.js',
    './bower_components/angular-animate/angular-animate.min.js',
    './bower_components/angular-local-storage/dist/angular-local-storage.js',
    './bower_components/angular-ui-router/release/angular-ui-router.js',
    './bower_components/angular-ui-notification/src/angular-ui-notification.js',
    './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    './bower_components/angular-permission/dist/angular-permission.js',
    './bower_components/angular-moment/angular-moment.min.js',
    './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    './bower_components/Bootflat/bootflat/js/*.js',
    './bower_components/ng-table/dist/ng-table.js',
    './src/js/**/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./www/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

var gulp = require('gulp')
var libsass = require('gulp-sass')
var concat = require('gulp-concat')
var prefix = require('gulp-autoprefixer')
var minifycss = require('gulp-minify-css')
var wait = require('gulp-wait')
var browserSync = require('browser-sync')

gulp.task('style', function () {
  return gulp.src([
    './bower_components/angular-ui-notification/dist/angular-ui-notification.min.css',
    './bower_components/components-font-awesome/css/font-awesome.min.css',
    './bower_components/ng-table/dist/ng-table.css',
    './src/css/*.css',
    './src/scss/style.scss'
  ])
    .pipe(wait(1000))
    .pipe(libsass())
    .pipe(prefix('last 1 version', '> 1%', 'ie 10', 'ie 11', 'iOS 6', 'iOS 7', 'Android 4', {
      cascade: true
    }))
    .pipe(concat('style.css'))
    .pipe(minifycss({keepSpecialComments: 0}))
    .pipe(gulp.dest('./www/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

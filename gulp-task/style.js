var gulp = require('gulp')
var libsass = require('gulp-sass')
var concat = require('gulp-concat')
var prefix = require('gulp-autoprefixer')
var minifycss = require('gulp-minify-css')
var browserSync = require('browser-sync')

gulp.task('style', function () {
  return gulp.src([
    './src/scss/*.scss'
  ])
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

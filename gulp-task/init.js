var gulp = require('gulp')
var fs = require('fs')

gulp.task('init', function () {
  if (!fs.existsSync('./www')) {
    fs.mkdirSync('./www')
  }
  if (!fs.existsSync('./www/css')) {
    fs.mkdirSync('./www/css')
  }
  if (!fs.existsSync('./www/js')) {
    fs.mkdirSync('./www/js')
  }
  if (!fs.existsSync('./www/img')) {
    fs.mkdirSync('./www/img')
  }
  if (!fs.existsSync('./www/templates')) {
    fs.mkdirSync('./www/templates')
  }
  gulp.src('./src/img/**')
    .pipe(gulp.dest('./www/img'))
  gulp.src('./src/templates/**')
    .pipe(gulp.dest('./www/templates'))
  gulp.src(['./src/fonts/**',
    './bower_components/bootstrap-sass/assets/fonts/bootstrap/*'])
    .pipe(gulp.dest('./www/fonts'))
  gulp.src('./src/html/**')
    .pipe(gulp.dest('./www'))
})

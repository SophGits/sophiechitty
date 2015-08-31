var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');

gulp.task('default', ['images','copy-index', 'watch']);

gulp.task('minify-scripts', function() {
  return gulp.src([
    "scripts/jquery-2.1.4.min.js",
    "scripts/script.js"
    ]) // this is not just *.js because it does it in the wrong order
  .pipe(concat('script.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/scripts')) // dist/assets
  .pipe(gulp.dest('./scripts')); //assets
});

gulp.task('minify-less', function() {
  return gulp.src('./styles/style.less')
  .pipe(less())
  .pipe(minifyCSS())
  .pipe(concat('style.min.css'))
  .pipe(gulp.dest('./styles'))
  .pipe(gulp.dest('./dist/styles'));
});

gulp.task('images', function() {
  return gulp.src('assets/images/**/*')
    .pipe(gulp.dest('dist/images'))
});

gulp.task('copy-index', function() {
  return gulp.src('./index.html')
    .pipe(gulp.dest('./dist'))
});

gulp.task('watch', function(){
  gulp.watch('styles/*.less', ['minify-less']);
  gulp.watch('scripts/*.js', ['minify-scripts']);
  gulp.watch('images/**/*', ['images']);
  gulp.watch('./index.html', ['copy-index']);
});
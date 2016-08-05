var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var http = require('http');
var st = require('st');

gulp.task('styles', function () {
  gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'))
    .pipe(livereload());
});

gulp.task('default', ['server'], function () {
  livereload.listen();
  gulp.watch('scss/**/*.scss', ['styles']);
});

gulp.task('server', function(done) {
  http.createServer(
    st({ path: __dirname, index: 'index.html', cache: false })
  ).listen(8080, done);
});

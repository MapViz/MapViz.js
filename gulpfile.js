var gulp = require("gulp");
var sass = require('gulp-sass');
var browserify = require("browserify");
var watchify = require("watchify");
var buffer = require('vinyl-buffer');
var source = require("vinyl-source-stream");
var uglify = require("gulp-uglify");

gulp.task('browserify', function() {
  return browserify({
      entries: ["./src/js/mapviz/index.js"],
      extensions: ['.js'],
      standalone: 'mapviz'
    })
    .bundle()
    .pipe(source('mapviz.js')) // gives streaming vinyl file object
    .pipe(buffer())
    .pipe(gulp.dest('./build/'));
});

gulp.task('uglify', function() {
  return browserify({
      entries: ["./src/js/mapviz/index.js"],
      extensions: ['.js'],
      standalone: 'mapviz'
    })
    .bundle()
    .pipe(source('mapviz.min.js')) // gives streaming vinyl file object
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass({
      compass: true,
      bundleExec: true,
      sourcemap: true,
      sourcemapPath: '../sass'
    }))
    .pipe(gulp.dest('./build/'));
});

gulp.task("default", function(){
  gulp.run('browserify', 'sass');
  gulp.watch("./src/js/mapviz/modules/*.js",function(){
    gulp.run('browserify');
  });
  gulp.watch("./src/js/libs/*.js",function(){
    gulp.run('browserify');
  });
  gulp.watch("./src/sass/*.scss",function(){
    gulp.run('sass');
  });
});

// gulp.task('default', ['browserify', 'uglify']);
// gulp.task('default', ['browserify']);
// gulp.task('default', ['uglify']);

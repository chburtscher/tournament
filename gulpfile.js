var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyHtml = require("gulp-minify-html");
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('./src/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task('watch', ['sass', 'html', 'static', 'browser-sync'], function () {
    gulp.watch(['./src/**/*.scss'], ['sass']);
    gulp.watch(['./src/*.html'], ['html']);
    gulp.watch(['./src/img/**'], ['static']);
});

gulp.task('html', function () {
    gulp.src('./src/*.html') // path to your files
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('static', function () {
    gulp.src('./bower_components/materialize/dist/fonts/**')
        .pipe(gulp.dest('dist/fonts'));
    gulp.src('./src/img/**')
        .pipe(gulp.dest('dist/img'));
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});

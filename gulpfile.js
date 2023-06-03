const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

gulp.task('compileSass', function () {
    return gulp.src('src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});


gulp.task('dev', function () {
    // Start the server
      browserSync.init({
        server: './'
      });
    //Watch for changes in JS and SCSS files
    //   gulp.watch('src/js/**/*.js', gulp.series('folder'));
      gulp.watch('src/styles/**/*.scss', gulp.series('compileSass'));
    
    // Reload the HTML page
      gulp.watch('index.html').on('change', browserSync.reload);
    });
    
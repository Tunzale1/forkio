
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const purgecss = require('gulp-purgecss');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

//imagemin
exports.default = () => (
  gulp.src('src/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/img'))
);

//src script to dist script
gulp.task("folder", function(){
  return gulp.src("src/script/script.js").pipe(gulp.dest("dist/js"))
})

//src scss to dis css
gulp.task('compileSass', function () {
  return gulp.src('src/scss/*')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
});

// remove unused CSS
gulp.task('css', function () {
  return gulp.src('dist/css/**/*.css')
    .pipe(purgecss({
      content: ['src/**/*.html', 'src/**/*.js'],
      safelist: [/^swiper-/, /^aos-/] // Add any classes or patterns you want to keep here
    }))
    .pipe(gulp.dest('dist/css'));
});

// Concatenate and minify JS files
gulp.task('js', function () {
  return gulp.src('src/script/**/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Building task
gulp.task('build', gulp.series( 'css','compileSass', 'js', 'folder'));
// Development task
gulp.task('dev', function () {
  // Start the server
    browserSync.init({
      server: './'
    });
  //Watch for changes in JS and SCSS files
    gulp.watch('src/script/**/*.js', gulp.series('folder'));
    gulp.watch('src/scss/**/*.scss', gulp.series('compileSass'));
  
  // Reload the HTML page
    gulp.watch('index.html').on('change', browserSync.reload);
  });

  // Clean the dist folder
gulp.task('clean', function () {
  return gulp.src('dist', { read: false, allowEmpty: true })
    .pipe(clean());
});

// Copy HTML file to the dist folder
gulp.task('copyHtml', function () {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'));
});
import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import sourcemaps from "gulp-sourcemaps";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import imagemin from "gulp-imagemin";
import browserSync from "browser-sync";

const sass = gulpSass(dartSass);
const server = browserSync.create();

const files = {
  scssPath: "src/scss/**/*.scss",
  jsPath: "src/js/**/*.js",
  imagePath: "src/images/**/*",
};

const sassBuildTask = () => {
  return gulp
    .src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(concat("styles.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(server.stream());
};

const jsTask = () => {
  return gulp
    .src(files.jsPath)
    .pipe(concat("scripts.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(server.stream());
};

const imageTask = () => {
  return gulp
    .src(files.imagePath)
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
    .pipe(server.stream());
};

const buildTask = gulp.series(
  gulp.parallel(sassBuildTask, jsTask, imageTask)
);

const serveTask = () => {
  server.init({
    server: {
      baseDir: "./",
    },
  });
};

const watchTask = () => {
  gulp.watch(files.scssPath, sassBuildTask);
  gulp.watch(files.jsPath, jsTask);
  gulp.watch(files.imagePath, imageTask);
  gulp.watch("*.html").on("change", server.reload);
};

export const dev = gulp.series(buildTask, gulp.parallel(watchTask, serveTask));

export { buildTask as build };
export default dev;

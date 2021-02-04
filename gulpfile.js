'use strict';
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sync = require('browser-sync').create();
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');

// Styles

const styles = () => {
  return gulp
    .src('source/sass/styles.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(
        postcss([
          autoprefixer({
            grid: true,
          }),
        ])
    )
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('source/css'))
    .pipe(sync.stream());
};

exports.styles = styles;

const sprite = () => {
  return gulp
    .src('source/img/icon-{pinterest,fb,insta,twitter,right-flash}.svg')
    .pipe(
        imagemin([
          imagemin.svgo({
            plugins: [
              {removeViewBox: false},
              {removeAttrs: {attrs: '(fill)'}},
            ],
          }),
        ])
    )
    .pipe(svgstore())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('source/img'));
};
exports.sprite = sprite;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source',
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series('styles'));
  gulp.watch('source/*.html').on('change', sync.reload);
};

exports.default = gulp.series(styles, server, watcher);

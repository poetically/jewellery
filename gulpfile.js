'use strict';
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sync = require('browser-sync').create();
const rename = require('gulp-rename');
const csso = require('gulp-csso');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const del = require('del');

const clean = () => {
  return del('build');
};
exports.clean = clean;

const images = () => {
  return gulp
    .src('source/img/**/*.{png,jpg,svg}')
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.mozjpeg({ progressive: true }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: false },
            { removeDimensions: true }
          ]
        })
      ])
    )
    .pipe(gulp.dest('build/img'));
};

exports.images = images;

const createWebp = () => {
  return gulp
    .src('source/img/**/*.{png,jpg}')
    .pipe(webp({ quality: 85 }))
    .pipe(gulp.dest('source/img'));
};
exports.webp = createWebp;

// Styles

const styles = () => {
  return gulp
    .src('source/sass/styles.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename('styles.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
};

exports.styles = styles;

const html = () => {
  return gulp
    .src('source/*.html')
    .pipe(gulp.dest('build'))
    .pipe(sync.stream());
};

exports.html = html;

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
    .pipe(gulp.dest('build/img'));
};
exports.sprite = sprite;

const copy = () => {
  return gulp
    .src(
      [
        'source/fonts/**/*.{woff,woff2}',
        'source/img/**/*.webp',
        'source/js/**',
        'source/*.ico',
        'source/*.html'
      ],
      {
        base: 'source',
      }
    )
    .pipe(gulp.dest('build'));
};
exports.copy = copy;

const build = gulp.series(
  clean,
  copy,
  images,
  styles,
  sprite
);
exports.build = build;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build',
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
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html', gulp.series(html));
};

exports.default = gulp.series(build, server, watcher);

import gulp from 'gulp';
import del from 'del';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
//import watch from 'gulp-watch';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import filter from 'gulp-filter';
import htmlmin from 'gulp-htmlmin';
import sourcemaps from 'gulp-sourcemaps';
import changed from 'gulp-changed';
import mozjpeg from 'imagemin-mozjpeg';
import pngquant from 'imagemin-pngquant';
import svgo from 'imagemin-svgo';
import gifsicle from 'imagemin-gifsicle';
import webp from 'imagemin-webp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import postcss from 'gulp-postcss';
import minifycss from 'gulp-minify-css';
import sass from 'gulp-sass';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import concat from 'gulp-concat';
import iife from 'gulp-iife';
import browserSync from 'browser-sync';
const bs = browserSync.create();

const config = yaml.load(fs.readFileSync(path.join(__dirname, 'config.yaml'), 'utf8'));

var vendorJavascriptSources = [
  config.paths.node_modules + '/moment/moment.js',
  config.paths.node_modules + '/moment-timezone/moment-timezone.js',
  config.paths.node_modules + '/numeral/numeral.js',
  config.paths.node_modules + '/jquery/dist/jquery.js',
  config.paths.node_modules + '/lodash/index.js',
  config.paths.node_modules + '/angular/angular.js',
  config.paths.node_modules + '/angular-ui-router/build/angular-ui-router.js',
  config.paths.node_modules + '/ngstorage/ngStorage.js',
  config.paths.node_modules + '/satellizer/satellizer.js',
  config.paths.node_modules + '/angular-cache/dist/angular-cache.js'
];

var appJavascriptSources = [
  config.paths.source.application + '/qq-app.js',
  config.paths.source.application + '/controllers/*.js',
  config.paths.source.application + '/directives/*.js',
  config.paths.source.application + '/middleware/*.js',
  config.paths.source.application + '/services/*.js'
];

//
// GULP TASKS
//
gulp.task('clean', (callback) => {
  del([config.paths.public.root]).then(function () {
    callback();
  });
});

gulp.task('fonts', () => {
  return gulp.src(path.join(config.paths.source.fonts, config.globs.fonts))
    .pipe(plumber())
    .pipe(gulp.dest(config.paths.public.fonts));
});

gulp.task('video', () => {
  return gulp.src(path.join(config.paths.source.video, config.globs.video))
    .pipe(plumber())
    .pipe(gulp.dest(config.paths.public.video));
});

gulp.task('audio', () => {
  return gulp.src(path.join(config.paths.source.audio, config.globs.audio))
    .pipe(plumber())
    .pipe(gulp.dest(config.paths.public.audio));
});

gulp.task('html', () => {
  return gulp.src([path.join(config.paths.source.html, config.globs.html)])
    .pipe(filter(['**']))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.paths.public.html));
});

gulp.task('html:minify', () => {
  return gulp.src(path.join(config.paths.public.html, config.globs.html))
    .pipe(plumber())
    .pipe(htmlmin(config.tasks.htmlmin.options))
    .pipe(gulp.dest(config.paths.public.html));
});

gulp.task('images', () => {
  return gulp.src(path.join(config.paths.source.images, config.globs.images))
    .pipe(plumber())
    .pipe(changed(config.paths.public.images))
    .pipe(gulpif('*.{jpg,jpeg}',mozjpeg(config.tasks.imagemin.mozjpeg)()))
    .pipe(gulpif('*.png',pngquant(config.tasks.imagemin.options.pngquant)()))
    .pipe(gulpif('*.gif',gifsicle(config.tasks.imagemin.options.gifsicle)()))
    .pipe(gulpif('*.svg',svgo(config.tasks.imagemin.options.svgo)()))
    .pipe(gulpif('*.webp',webp(config.tasks.imagemin.options.webp)()))
    .pipe(gulp.dest(config.paths.public.images));
});

gulp.task('javascript', () => {
  gulp.src(vendorJavascriptSources)
    .pipe(plumber())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(config.paths.public.scripts));

  return gulp.src(appJavascriptSources)
    .pipe(iife())
    .pipe(plumber())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(gulpif(config.tasks.babel.enabled, babel(config.tasks.babel.options)))
    .pipe(sourcemaps.write())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(config.paths.public.scripts));
});

gulp.task('javascript:minify', () => {
  return gulp.src(path.join(config.paths.public.scripts, config.globs.scripts))
    .pipe(plumber())
    .pipe(gulpif(config.tasks.uglify.enabled, uglify(config.tasks.uglify.options)))
    .pipe(gulp.dest(config.paths.public.scripts));
});

gulp.task('styles', () => {
  return gulp.src(path.join(config.paths.source.styles, config.globs.styles))
    .pipe(plumber())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass(config.tasks.sass.options))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.paths.public.styles));
});

gulp.task('styles:production', () => {
  return gulp.src(path.join(config.paths.source.styles, config.globs.styles))
    .pipe(plumber())
    .pipe(sass(config.tasks.sass.options))
    .pipe(postcss([cssnano(config.tasks.cssnano.options)]))
    .pipe(gulpif(config.tasks.minifycss.enabled, minifycss(config.tasks.minifycss.options)))
    .pipe(gulp.dest(config.paths.public.styles));
});

gulp.task('build',
  gulp.series(
    'images',
    gulp.parallel('javascript', 'styles', 'html'),
    gulp.parallel('fonts', 'audio', 'video')
  )
);

gulp.task('production',
  gulp.series(
    'clean',
    gulp.parallel('images', 'audio', 'video', 'fonts', 'styles:production'),
    gulp.parallel('javascript', 'html'),
    gulp.parallel('html:minify', 'javascript:minify')
  )
);

gulp.task('browsersync', () => {
  bs.init({
    reloadOnRestart: true,
    logConnections: true,
    // logLevel: 'debug',
    notify: false,
    open: true,
    minify: false,
    server: {
      baseDir: config.paths.public.root
    }
  });

  gulp.watch(path.join(config.paths.source.root, '/**/*.{sass,scss,css}'), gulp.series(
    'styles','browsersync:reload'
  ));
  gulp.watch(path.join(config.paths.source.root, '/**/*.{htm,html}'), gulp.series(
    'html', 'browsersync:reload'
  ));
  gulp.watch(path.join(config.paths.source.root, '/**/*.{js}'), gulp.series(
    'javascript', 'javascript:minify', 'browsersync:reload'
  ));
  gulp.watch(path.join(config.paths.source.root, '/**/*.{jpg,jpeg,gif,svg,png}'), gulp.series(
    'images', 'browsersync:reload'
  ));
});

gulp.task('browsersync:reload', () => {
  return bs.reload();
});

gulp.task('default', gulp.series('build', 'browsersync'));

// gulp.task('watch', ['build'], () => {
//   watch(path.join(config.paths.source.html, config.globs.html), {usePolling: true}, () => {
//     gulp.start('html');
//   });
//   watch(path.join(config.paths.source.styles, config.globs.styles), {usePolling: true}, () => {
//     gulp.start('styles');
//   });
//
//   watch(path.join(config.paths.source.application, config.globs.scripts), {usePolling: true}, () => {
//     gulp.start('javascript');
//     gulp.start('javascript:minify');
//   });
//
//   watch(path.join(config.paths.source.fonts, config.globs.fonts), {usePolling: true}, () => {
//     gulp.start('fonts');
//   });
//   watch(path.join(config.paths.source.images, config.globs.images), {usePolling: true}, () => {
//     gulp.start('images');
//   });
//   watch(path.join(config.paths.source.video, config.globs.video), {usePolling: true}, () => {
//     gulp.start('video');
//   });
//   watch(path.join(config.paths.source.audio, config.globs.audio), {usePolling: true}, () => {
//     gulp.start('audio');
//   });
//   console.log('NOTICE: Gulp is watching for changes. Press CTRL-C to stop.');
// });

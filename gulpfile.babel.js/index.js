import gulp from 'gulp';
import del from 'del';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
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
import env from "gulp-env";
import replace from "gulp-replace";
import cordovaLib from 'cordova-lib';
import shell from 'gulp-shell';

const cordova = cordovaLib.cordova;

env({file: ".env.json"});

const bs = browserSync.create();

const config = yaml.load(fs.readFileSync(path.join(__dirname, 'config.yaml'), 'utf8'));

function fullPath (pathString) {
  return path.normalize(__dirname + '/../' + pathString);
}

function isMobile() {
  return (isIos() || isAndoid());
}

function isAndoid() {
     return process.env.PLATFORM === 'android';
}

function isIos() {
    return process.env.PLATFORM === 'ios';
}

function isWeb() {
  return process.env.PLATFORM == 'web';
}

var buildPath = './source/styles/config/_build.scss';
if(isMobile()){
    var mediaLocationFromRoot   = './media';


    if (fs.existsSync(buildPath)) fs.unlinkSync(buildPath);
    fs.writeFile(buildPath, '$logo-background-url: url(../media/images/logo.svg) no-repeat;\n $more-link-display: none;', function (err) {
        if (err) return console.log(err);
        console.log('error building build.scss');
    });

} else {
    var mediaLocationFromRoot = '/media';

    if (fs.existsSync(buildPath)) fs.unlinkSync(buildPath);
    fs.writeFile(buildPath, '$logo-background-url: url(/media/images/logo.svg) no-repeat;\n $more-link-display: block;', function (err) {
        if (err) return console.log(err);
        console.log('error building build.scss');
    });
}



console.log('full path: ' + fullPath(config.paths.node_modules));

var vendorJavascriptSources = [
  fullPath(config.paths.node_modules + '/moment/moment.js'),
  fullPath(config.paths.node_modules + '/moment-timezone/moment-timezone.js'),
  fullPath(config.paths.node_modules + '/numeral/numeral.js'),
  fullPath(config.paths.node_modules + '/jquery/dist/jquery.js'),
  fullPath(config.paths.node_modules + '/underscore/underscore.js'),
  fullPath(config.paths.node_modules + '/angular/angular.js'),
  fullPath(config.paths.node_modules + '/angular-ui-router/release/angular-ui-router.js'),
  fullPath(config.paths.node_modules + '/ngstorage/ngStorage.js'),
  fullPath(config.paths.node_modules + '/satellizer/satellizer.js'),
  fullPath(config.paths.node_modules + '/angular-cache/dist/angular-cache.js'),
  fullPath(config.paths.vendor + '/ng-cordova.js')
];

//Cordova complains about it not being a Cordova project if www does not exist
if (! fs.existsSync('./www')) fs.mkdirSync('./www');

//
// GULP TASKS
//

gulp.task('cordova:clean', (done) => { cordova.clean({},   done); });
gulp.task('cordova:prepare', (done) => { cordova.prepare({}, done); });
gulp.task('cordova:build', (done) => {
    cordova.build({},   done);
});

gulp.task('clean:www', (callback) => {
  del([fullPath(config.paths.public.root)]).then(function () {
    callback();
  });
});

gulp.task('fonts', () => {
  return gulp.src(path.join(fullPath(config.paths.source.fonts), config.globs.fonts))
    .pipe(plumber())
    .pipe(gulp.dest(fullPath(config.paths.public.fonts)));
});

gulp.task('video', () => {
  return gulp.src(path.join(fullPath(config.paths.source.video), config.globs.video))
    .pipe(plumber())
    .pipe(gulp.dest(fullPath(config.paths.public.video)));
});

gulp.task('audio', () => {
  return gulp.src(path.join(fullPath(config.paths.source.audio), config.globs.audio))
    .pipe(plumber())
    .pipe(gulp.dest(fullPath(config.paths.public.audio)));
});

gulp.task('html', () => {
  var platformContent = '';

  if (isMobile()) {
      platformContent = '<script src="./cordova.js"></script>\n\t<script src="./scripts/init.js"></script>';
  }

  if (isWeb()) {
    platformContent = '<base href="/">'
  }

  gulp.src([
        path.join(fullPath(config.paths.source.html), config.globs.html),
        path.join(fullPath(config.paths.source.application), config.globs.html),
      ])
      .pipe(filter(['**']))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(fullPath(config.paths.public.views)));

  if (isWeb()) {
    gulp.src([
          config.paths.source.root + '/apple-app-site-association',
          './ul_web_hooks/android/android_web_hook.html'
        ])
        .pipe(gulp.dest(fullPath(config.paths.public.html)));
  }

  return gulp.src([
      config.paths.source.root + '/index.html'
    ])
      .pipe(replace("app.PLATFORM_CONTENT", platformContent))
      .pipe(replace("app.PLATFORM", process.env.PLATFORM))
      .pipe(replace("app.ENVIRONMENT", process.env.ENVIRONMENT))
      .pipe(replace("app.WEB_CONTENT", process.env.ENVIRONMENT))
    .pipe(filter(['**']))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(fullPath(config.paths.public.html)));
});

gulp.task('html:minify', () => {
  return gulp.src(path.join(fullPath(config.paths.public.html), config.globs.html))
    .pipe(plumber())
    .pipe(htmlmin(config.tasks.htmlmin.options))
    .pipe(gulp.dest(fullPath(config.paths.public.html)));
});

gulp.task('images', () => {
  return gulp.src(path.join(fullPath(config.paths.source.images), config.globs.images))
    .pipe(plumber())
    .pipe(changed(fullPath(config.paths.public.images)))
    .pipe(gulpif('*.{jpg,jpeg}',mozjpeg(config.tasks.imagemin.mozjpeg)()))
    .pipe(gulpif('*.png',pngquant(config.tasks.imagemin.options.pngquant)()))
    .pipe(gulpif('*.gif',gifsicle(config.tasks.imagemin.options.gifsicle)()))
    .pipe(gulpif('*.svg',svgo(config.tasks.imagemin.options.svgo)()))
    .pipe(gulpif('*.webp',webp(config.tasks.imagemin.options.webp)()))
    .pipe(gulp.dest(fullPath(config.paths.public.images)));
});

gulp.task('javascript', () => {
  gulp.src(vendorJavascriptSources)
    .pipe(plumber())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(fullPath(config.paths.public.scripts)));

  if (isMobile()) {
    gulp.src(fullPath(config.paths.source.root + '/init.js'))
        .pipe(gulp.dest(fullPath(config.paths.public.scripts)));
  }

  return gulp.src(
      [
          fullPath(config.paths.source.application + '/**/*.module.js'),
          fullPath(config.paths.source.application + '/**/*.config.route.js'),
          fullPath(config.paths.source.application + '/**/*.js')
      ]
  )
      .pipe(replace("app.API_URI", process.env.API_URI))
      .pipe(replace("app.PLATFORM", process.env.PLATFORM))
      .pipe(replace("app.ENVIRONMENT", process.env.ENVIRONMENT))
      .pipe(replace("app.OAUTH_URI", process.env.OAUTH_URI))
      .pipe(replace("app.OAUTH_RETURN_URI", process.env.OAUTH_RETURN_URI))
      .pipe(replace("app.ORGANIZATION_RETURN_URI", process.env.ORGANIZATION_RETURN_URI))
      .pipe(replace("app.MEDIA_LOCATION_FROM_ROOT", mediaLocationFromRoot))
      .pipe(plumber())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(gulpif(config.tasks.babel.enabled, babel(config.tasks.babel.options)))
      .pipe(sourcemaps.write())
      .pipe(concat('app.js'))
      .pipe(gulp.dest(fullPath(config.paths.public.scripts)));
});

gulp.task('javascript:minify', () => {
  return gulp.src(path.join(fullPath(config.paths.public.scripts), config.globs.scripts))
    .pipe(plumber())
    .pipe(gulpif(config.tasks.uglify.enabled, uglify(config.tasks.uglify.options)))
    .pipe(gulp.dest(fullPath(config.paths.public.scripts)));
});

gulp.task('styles', () => {

    gulp.src(fullPath(config.paths.source.styles + '/' + config.globs.styles))
        .pipe(replace("app.MEDIA_LOCATION_FROM_ROOT", mediaLocationFromRoot))

  return gulp.src(fullPath(config.paths.source.styles + '/' + config.globs.styles))
    .pipe(plumber())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass(config.tasks.sass.options))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(fullPath(config.paths.public.styles)));

});

gulp.task('styles:production', () => {

    return gulp.src(fullPath(config.paths.source.styles + '/' + config.globs.styles))
    .pipe(replace("app.MEDIA_LOCATION_FROM_ROOT", mediaLocationFromRoot))
    .pipe(plumber())
    .pipe(sass(config.tasks.sass.options))
    .pipe(postcss([cssnano(config.tasks.cssnano.options)]))
    .pipe(gulpif(config.tasks.minifycss.enabled, minifycss(config.tasks.minifycss.options)))
    .pipe(gulp.dest(fullPath(config.paths.public.styles)));
});


gulp.task('build', (() => {
  var buildTasks = [
    'clean:www',
    'images',
    gulp.parallel('javascript', 'styles', 'html'),
    gulp.parallel('fonts', 'audio', 'video')
  ];

  if (isMobile()) {
      buildTasks.push('cordova:prepare');

      if (isAndoid()) {
          shell.task(['cordova-icon']);
          gulp.src(fullPath('./release-signing.properties'))
              .pipe(gulp.dest(fullPath(config.paths.platforms.android))
              );
      }
  }

  return gulp.series.apply(gulp, buildTasks);
})());

gulp.task('staging',
  gulp.series(
    'clean:www',
    'images',
    gulp.parallel('javascript', 'styles', 'html'),
    gulp.parallel('fonts', 'audio', 'video')
  )
);

gulp.task('production',
  gulp.series(
    'clean:www',
    gulp.parallel('images', 'audio', 'video', 'fonts', 'styles:production'),
    gulp.parallel('javascript', 'html'),
    gulp.parallel('html:minify', 'javascript:minify')
  )
);


gulp.task('browsersync', () => {
  var baseDir;
  console.log(process.env.PLATFORM);
  if (isMobile()) {
    baseDir = './platforms/browser/www';
  } else if (isWeb()) {
    baseDir = './www';
  } else {
    throw "unable to determine base directory for browsersync"
  }

  bs.init({
    reloadOnRestart: true,
    logConnections: true,
    // logLevel: 'debug',
    notify: false,
    open: true,
    minify: false,
    server: {
      baseDir: fullPath(baseDir)
    }
  });

  gulp.watch(path.join(fullPath(config.paths.source.root), '/**/*.{sass,scss,css}'), gulp.series(
    'styles', 'cordova:prepare', 'browsersync:reload'
  ));
  gulp.watch(path.join(fullPath(config.paths.source.root), '/**/*.{htm,html}'), gulp.series(
    'html', 'cordova:prepare', 'browsersync:reload'
  ));
  gulp.watch(path.join(fullPath(config.paths.source.root), '/**/*.{js}'), gulp.series(
    'javascript', 'cordova:prepare', 'javascript:minify', 'browsersync:reload'
  ));
  gulp.watch(path.join(fullPath(config.paths.source.root), '/**/*.{jpg,jpeg,gif,svg,png}'), gulp.series(
    'images', 'cordova:prepare', 'browsersync:reload'
  ));
});

gulp.task('browsersync:reload', () => {
  return bs.reload();
});

gulp.task('default', gulp.series('build', 'browsersync'));

import gulp from 'gulp'
import del from 'del'
import watch from 'gulp-watch'
import plumber from 'gulp-plumber'
import gulpif from 'gulp-if'
import filter from 'gulp-filter'
import htmlmin from 'gulp-htmlmin'
import nunjucksRender from 'gulp-nunjucks-render'
import lazypipe from 'lazypipe'
import sourcemaps from 'gulp-sourcemaps'
import changed from 'gulp-changed'
import mozjpeg from 'imagemin-mozjpeg'
import pngquant from 'imagemin-pngquant'
import svgo from 'imagemin-svgo'
import gifsicle from 'imagemin-gifsicle'
import webp from 'imagemin-webp'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import postcss from 'gulp-postcss'
import minifycss from 'gulp-minify-css'
import sass from 'gulp-sass'
import runSequence from 'run-sequence'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import concat from 'gulp-concat'
import iife from 'gulp-iife'



var config = {
  path: {
    root: {
      src:  './resources/assets/',
      pub: './public/',
      node: './node_modules/'
    }
  },
  task: {}
};

config.path.node_modules = {
  src: './node_modules/',
};

config.path.html = {
  src: config.path.root.src + 'html/',
  pub: config.path.root.pub + '',
  glob: [
    "**/**.{html,htm,php}"
  ]
};

config.path.images = {
  src: config.path.root.src + 'media/images/',
  pub: config.path.root.pub + 'media/images/',
  glob: [
    "**/**.{jpg,jpeg,png,gif,svg,webp}"
  ]
};

config.path.video = {
  src: config.path.root.src + 'media/video/',
  pub: config.path.root.pub + 'media/video/',
  glob: [
    "**/**.{mp4,avi,webm,ogv,mkv,mpeg,mov,f4v,wmv}"
  ]
};

config.path.audio = {
  src: config.path.root.src + 'media/audio/',
  pub: config.path.root.pub + 'media/audio/',
  glob: [
    "**/**.{mp3,ogg,oga,aac,wav,flac,m4a,wma,aiff}"
  ]
};

config.path.styles = {
  src: config.path.root.src + 'styles/',
  pub: config.path.root.pub + 'styles/',
  glob: [
    "**/**.{css,scss,sass}"
  ]
};

config.path.application = {
  src: config.path.root.src + 'app/',
  pub: config.path.root.pub + 'scripts/',
  glob: "**/*.js"
};

config.path.scripts = {
  src: config.path.root.src + 'scripts/',
  pub: config.path.root.pub + 'scripts/',
  glob: [
    "**/**.js"
  ]
};

config.path.fonts = {
  src: config.path.root.src + 'fonts/',
  pub: config.path.root.pub + 'fonts/',
  glob: [
    "**/**.{ttf,eot,woff,woff2,svg,otf}"
  ]
};


//
// TASKS
//

config.task.htmlmin = {
  enabled: true,
  options: {
    collapseWhitespace: true
  }
};

config.task.nunjucks = {
  enabled: true,
  options: [
    config.path.html.src
  ],
  tags: {
    blockStart: '<%',
    blockEnd: '%>',
    variableStart: '<$',
    variableEnd: '$>',
    commentStart: '<#',
    commentEnd: '#>'
  }
};


config.task.sass = {
  enabled: true,
  options: {
    includePaths: [
      config.path.root.node
    ],
    outputStyle: 'compressed',
    errLogToConsole: true
  }
};

config.task.cssnano = {
  enabled: true,
  options: {
      // Full Optimization List: http://cssnano.co/optimisations/
      autoprefixer: {
        browsers: ['last 2 versions']
      },
      calc: true,
      discardComments: true,
      minifyFontValues: true,
      mergeIdents: true,
      reduceIdents: false,
      mergeRules: true,
      discardUnused: true,
      normalizeUrl: true,
      zindex: true
    }
};

config.task.babel = {
  enabled: true,
  options: {}
};

config.task.minifycss = {
  enabled: true,
  options: {
    keepSpecialComments: 0
  }
};

config.task.uglify = {
  enabled: true,
  options: {}
};

config.task.imagemin = {
  enabled: true,
  options: {
    svgo: {
      multipass: true,
      plugins: [
        { removeViewBox: false },
  //    { removeUselessStrokeAndFill: false }
      ]
    },
    gifsicle: {
      interlaced: true
    },
    pngquant: {
      floyd: 0.5,
      nofs: false,
      quality: null,
      speed: 3,
      verbose: false,
  //  posterize: <number>,
    },
    webp: {
      preset: 'default',
      quality: 75,
      alphaQuality: 100,
      method: 6,
      autoFilter: true,
      sharpness: 0,
      lossless: false,
  //  sns: 80,
  //  filter: 50,
    },
    mozjpeg: {
      quality: 80,
      progressive: true,
      targa: false,
      revert: false,
      fastcrush: false,
      dcScanOpt: 1,
      notrellis: false,
      notrellisDC: false,
      tune: 'hvs-psnr',
      noovershoot: false,
      arithmetic: false,
  //  quantTable: <number>,
  //  smooth: <number>,
  //  maxmemory: <number>,
    },
  }
};

var vendorJavascriptSources = [
  config.path.node_modules.src + 'moment/moment.js',
  config.path.node_modules.src + 'moment-timezone/moment-timezone.js',
  config.path.node_modules.src + 'numeral/numeral.js',
  config.path.node_modules.src + 'jquery/dist/jquery.js',
  config.path.node_modules.src + 'lodash/index.js',
  config.path.node_modules.src + 'angular/angular.js',
  config.path.node_modules.src + 'angular-ui-router/build/angular-ui-router.js',
  config.path.node_modules.src + 'ngstorage/ngstorage.js',
  config.path.node_modules.src + 'satellizer/satellizer.js',
  config.path.node_modules.src + 'angular-cache/dist/angular-cache.js',
];

var appJavascriptSources = [
  config.path.application.src + 'qq-app.js',
  config.path.application.src + 'controllers/' + config.path.application.glob,
  config.path.application.src + 'directives/' + config.path.application.glob,
  config.path.application.src + 'middleware/' + config.path.application.glob,
  config.path.application.src + 'services/' + config.path.application.glob
];

//
// GULP TASKS
//
gulp.task('clean', (callback) => {
  del([config.path.root.pub]).then(function () {
    callback()
  })
});

gulp.task('fonts', () => {
  return gulp.src(config.path.fonts.glob, {cwd:config.path.fonts.src})
    .pipe(plumber())
    .pipe(gulp.dest(config.path.fonts.pub))
});

gulp.task('video', () => {
  return gulp.src(config.path.video.src + config.path.video.glob)
    .pipe(plumber())
    .pipe(gulp.dest(config.path.video.pub))
});

gulp.task('audio', () => {
  return gulp.src(config.path.audio.src + config.path.audio.glob)
    .pipe(plumber())
    .pipe(gulp.dest(config.path.audio.pub))
});

gulp.task('other', () => {
  return gulp.src(config.path.root.src + '*.*')
    .pipe(plumber())
    .pipe(gulp.dest(config.path.html.pub))
});

gulp.task('html', () => {
  return gulp.src([config.path.html.src + config.path.html.glob])
      .pipe(filter(['**']))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.path.html.pub))
});

gulp.task('html:minify', () => {
  return gulp.src(config.path.html.pub + config.path.html.glob)
    .pipe(plumber())
    .pipe(htmlmin(config.task.htmlmin.options))
    .pipe(gulp.dest(config.path.html.pub))
});

gulp.task('imagemin', () => {
  return gulp.src(config.path.images.src + config.path.images.glob)
    .pipe(plumber())
    .pipe(changed(config.path.images.pub))
    .pipe(gulpif('*.{jpg,jpeg}',mozjpeg(config.task.imagemin.mozjpeg)()))
    .pipe(gulpif('*.png',pngquant(config.task.imagemin.pngquant)()))
    .pipe(gulpif('*.gif',gifsicle(config.task.imagemin.gifsicle)()))
    .pipe(gulpif('*.svg',svgo(config.task.imagemin.svgo)()))
    .pipe(gulpif('*.webp',webp(config.task.imagemin.webp)()))
    .pipe(gulp.dest(config.path.images.pub))
});

gulp.task('javascript', () => {
  gulp.src(vendorJavascriptSources)
      .pipe(plumber())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write())
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest(config.path.scripts.pub));

  return gulp.src(appJavascriptSources)
      .pipe(iife())
    .pipe(plumber())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(gulpif(config.task.babel.enabled,babel(config.task.babel.options)))
    .pipe(sourcemaps.write())
      .pipe(concat('app.js'))
    .pipe(gulp.dest(config.path.scripts.pub))
});

gulp.task('javascript:minify', () => {
  return gulp.src(config.path.scripts.pub + config.path.scripts.glob)
    .pipe(plumber())
    .pipe(gulpif(config.task.uglify.enabled,uglify(config.task.uglify.options)))
    .pipe(gulp.dest(config.path.scripts.pub))
});

gulp.task('styles', () => {
  return gulp.src(config.path.styles.src + '**/*.{scss,sass}')
    .pipe(plumber())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass(config.task.sass.options))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.path.styles.pub))
});

gulp.task('styles:production', () => {
  return gulp.src(config.path.styles.src + '**/*.{scss,sass}')
    .pipe(plumber())
    .pipe(sass(config.task.sass.options))
    .pipe(postcss([cssnano(config.task.cssnano.options)]))
    .pipe(gulpif(config.task.minifycss.enabled, minifycss(config.task.minifycss.options)))
    .pipe(gulp.dest(config.path.styles.pub))
});




gulp.task('build', (callback) => {
  runSequence('imagemin', ['javascript', 'styles', 'html'], ['fonts', 'audio', 'video', 'other'], callback)
});

gulp.task('production', (callback) => {
  runSequence(
    'clean',
    ['imagemin', 'audio', 'video', 'fonts', 'other', 'styles:production'],
    ['javascript', 'html'],
    ['html:minify', 'javascript:minify'],
    callback
  )
});

gulp.task('default', ['watch']);

gulp.task('watch', ['build'], () => {
  watch(config.path.html.src + config.path.html.glob, {usePolling: true}, () => {
    gulp.start('html')
  });
  watch(config.path.styles.src + config.path.styles.glob, {usePolling: true}, () => {
    gulp.start('styles');
  });
  watch(config.path.scripts.src + config.path.scripts.glob, {usePolling: true}, () => {
    gulp.start('javascript');
    gulp.start('javascript:minify');
  });
  watch(config.path.application.src + config.path.application.glob, {usePolling: true}, () => {
    gulp.start('javascript');
  });

  watch(config.path.fonts.src + config.path.fonts.glob, {usePolling: true}, () => {
    gulp.start('fonts')
  });
  watch(config.path.images.src + config.path.images.glob, {usePolling: true}, () => {
    gulp.start('imagemin')
  });
  watch(config.path.video.src + config.path.video.glob, {usePolling: true}, () => {
    gulp.start('video')
  });
  watch(config.path.audio.src + config.path.audio.glob, {usePolling: true}, () => {
    gulp.start('audio')
  });
  watch(config.path.root.src + '*.*', {usePolling: true}, () => {
    gulp.start('other')
  });
  console.log('NOTICE: Gulp is watching for changes. Press CTRL-C to stop.');
});

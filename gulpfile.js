// ========================================
// Required plugins
// ========================================

// Plugin declarations
var gulp = require('gulp');
// https://www.npmjs.com/package/gulp-load-plugins
var plugins = require('gulp-load-plugins')();


// ========================================
// Set Paths
// ========================================

// Variable declarations
// http://www.mikestreety.co.uk/blog/an-advanced-gulpjs-file
var paths = {
  jade: {
    src:  'assets/jade/pages/*.jade',
    dest: '',
  },
  scss: {
    src:  'assets/scss/**/*.scss',
    dest: 'assets/css',
  },
  icons: {
    src:  'assets/icons/*.svg',
    targetPath: '../scss/base/_icons.scss',
    fontPath: '../fonts/',
    dest:   'assets/fonts/'
  },
  js: {
    compile: ['assets/js/*.js'],
    src:  ['assets/js/*.js','assets/js/silk/*.js'],
    dest: 'assets/js/build'
  },
  templates: {
    src:  'assets/js/templates/**/*'
  }
};


// ========================================
// Jade
// ========================================

gulp.task('compile-jade', function() {
  return gulp.src(paths.jade.src)
    .pipe(plugins.jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.jade.dest))
    .pipe(plugins.livereload());
});


// ========================================
// Icon Font
// ========================================

// Sets the font name of your icon set
var fontName = 'idfive';

// Creates an iconfont based on .svg(s) from assets/icons/
gulp.task('iconfont', function() {
  gulp.src(paths.icons.src)
    // https://www.npmjs.com/package/gulp-iconfont-css
    .pipe(plugins.iconfontCss({
      fontName: fontName,
      targetPath: paths.icons.targetPath,
      fontPath: paths.icons.fontPath
    }))
    // https://www.npmjs.com/package/gulp-iconfont
    .pipe(plugins.iconfont({
      fontName: fontName,
      // Adjusts output
      normalize: true,
      fontHeight: 1001,
      appendCodepoints: true
    }))
    .pipe(gulp.dest(paths.icons.dest));
});


// ========================================
// Compile Sass
// ========================================

// Compile scss files within assets/scss/
gulp.task('compile-sass', function() {
  return gulp.src(paths.scss.src)
    // https://www.npmjs.com/package/gulp-css-globbing
    .pipe(plugins.cssGlobbing({
      extensions: ['.scss']
    }))
    // https://www.npmjs.com/package/gulp-ruby-sass
    .pipe(plugins.rubySass({
      "sourcemap=none": true,
      style: 'expanded',
      precision: 8
    }))
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    // https://www.npmjs.com/package/gulp-autoprefixer
    .pipe(plugins.autoprefixer({
      browsers: ['last 8 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(plugins.livereload());
});


// ========================================
// Compile js
// ========================================

// Compiles js from assets/js/, aggregated silk js modules, concatenates js
gulp.task('compile-js', function() {
  return gulp.src(paths.js.compile)
    // https://www.npmjs.com/package/gulp-include
    .pipe(plugins.include())
    // https://www.npmjs.com/package/gulp-plumber
    .pipe(plugins.plumber())
    .pipe(gulp.dest(paths.js.dest))
    // https://www.npmjs.com/package/gulp-uglify
    .pipe(plugins.uglify({
      mangle: false
    }))
    .pipe(gulp.dest(paths.js.dest));
});


// ========================================
// Create Watch Task
// ========================================

// Defines all the tasks which run when 'gulp watch' is executed
// This task is executed by default when 'gulp' is executed
gulp.task('watch', function() {
  plugins.livereload.listen();
  gulp.watch('assets/jade/**/*.jade', ['compile-jade']);
  gulp.watch(paths.scss.src, ['compile-sass']);
  gulp.watch(paths.js.src, ['compile-js']);
});


// ========================================
// Default 'gulp' task
// ========================================

// Defines all the tasks which run when 'gulp' is executed
gulp.task('default', ['compile-jade', 'iconfont', 'compile-sass', 'compile-js', 'watch']);

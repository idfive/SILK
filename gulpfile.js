// ========================================
// Required plugins
// ========================================

var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    include = require('gulp-include'),
    uglify = require('gulp-uglify'),
    svgSprite = require('gulp-svg-sprite'),
    accessibility = require('gulp-accessibility');


// ========================================
// Set Paths
// ========================================

var paths = {

  jade: {
    src:  'assets/jade/pages/*.jade',
    dest: '',
  },
  sass: {
    src:  'assets/scss/**/*.scss',
    dest: 'assets/css',
  },
  js: {
    compile: ['assets/js/*.js'],
    src:  ['assets/js/*.js','assets/js/silk/*.js'],
    dest: 'assets/js/build'
  },
  sprite: {
    src:  'assets/icons/*.svg',
    dest: 'assets/images/'
  }

};


// ========================================
// Jade
// ========================================

gulp.task('jade', function() {

  return gulp.src(paths.jade.src)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.jade.dest))
    .pipe(browserSync.stream());

});


// ========================================
// Compile Sass / Examine Output
// ========================================

gulp.task('sass', function() {

  return gulp.src(paths.sass.src)
    .pipe(sass({
      outputStyle: 'expanded',
      precision: 2
    }).on('error', sass.logError))
    .pipe(postcss([
      require('autoprefixer')({
        browsers: ['last 8 versions'],
        cascade: false
      })
    ]))
    .pipe(gulp.dest(paths.sass.dest))
    .pipe(browserSync.stream());

});

gulp.task('check-css', function() {

  return gulp.src(paths.sass.dest + '/*.css')
    .pipe(postcss([
      require('doiuse')({
        browsers: [
          'ie >= 9',
          'last 3 versions'
        ],
        ignore: ['css-transitions']
      })
    ]));

});


// ========================================
// Compile js
// ========================================

gulp.task('js', function() {

  return gulp.src(paths.js.compile)
    .pipe(include())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(gulp.dest(paths.js.dest));

});


// ========================================
// SVG Sprite
// ========================================

gulp.task('sprite', function() {

  return gulp.src(paths.icons.src)
    .pipe(svgSprite({
      shape: {
        dimension: {
          maxWidth: 80,
          maxHeight: 80
        }
      },
      mode: {
        symbol: {
          bust: false,
          dest: './'
        }
      }
    }))
    .pipe(gulp.dest('assets/'))
    .pipe(browserSync.stream());

});


// ========================================
// Accessibility Tasks
// ========================================

gulp.task('accessibility', function() {

  return gulp.src('*.html')
    .pipe(accessibility());

});


// ========================================
// Initialize Browser Sync
// ========================================

gulp.task('browser-sync', function() {

  browserSync.init({
    logPrefix: 'idfive',
    server: {
      baseDir: './',
    }
  });

});


// ========================================
// Create Watch Task
// ========================================

gulp.task('watch', function() {

  gulp.watch('assets/jade/**/*.jade', ['jade']);
  gulp.watch(paths.sass.src, ['sass', 'jade']);
  gulp.watch(paths.js.src, ['js']);

});


// ========================================
// Default 'gulp' task
// ========================================

gulp.task('default', ['jade', 'sass', 'js', 'sprite', 'watch', 'browser-sync']);

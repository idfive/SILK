// ========================================
// Required plugins
// ========================================

var gulp = require('gulp');
var globbing = require('gulp-css-globbing');
var plugins = require('gulp-load-plugins')();


// ========================================
// Set Paths
// ========================================

var paths = {
  css: {
    src:  'assets/scss/**/*.scss',
    dest: 'assets/css'
  },
  icons: {
    src:  'assets/icons/*.svg',
    targetPath: '../scss/base/_icons.scss',
      fontPath: '../fonts/',
    dest:   'assets/fonts/'
  },
  js: {
    src:  'assets/js/*.js',
    dest: 'assets/js/build'
  },
  templates: {
    src:  'assets/js/templates/**/*'
  }
};


// ========================================
// Icon Font
// ========================================

// Change to project name
var fontName = 'idfive';

// Create Icon font
// All svgs from assets/icons will be merged into this font
gulp.task('iconfont', function() {
  gulp.src(paths.icons.src)
    .pipe(plugins.iconfontCss({
      fontName: fontName,
      targetPath: paths.icons.targetPath,
      fontPath: paths.icons.fontPath
    }))
    .pipe(plugins.iconfont({
      fontName: fontName,
      normalize: true,
      fontHeight: 1001,
      appendCodepoints: true
    }))
    .pipe(gulp.dest(paths.icons.dest));
});


// ========================================
// Compile Sass
// ========================================

gulp.task('compile-sass', function() {
  return gulp.src(paths.css.src)
    .pipe(globbing({
      extensions: ['.scss']
    }))
    .pipe(plugins.rubySass({
      style: 'compressed',
      precision: 8
    }))
    .pipe(gulp.dest(paths.css.dest));
});


// ========================================
// Lint Js
// ========================================

gulp.task('lint-js', function() {
  return gulp .src(paths.js.src)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});


// ========================================
// Compile js
// ========================================

gulp.task('compile-js', function() {
  return gulp
    .src(paths.js.src)
    .pipe(plugins.plumber())
    .pipe(plugins.browserify())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.js.dest));
});


// ========================================
// Compile Handlebars
// ========================================

gulp.task('templates', function() {
  gulp.src(paths.templates.src)
    .pipe(plugins.handlebars())
    .pipe(plugins.defineModule('plain', {
      require: { Handlebars: 'handlebars'},
      wrapper: 'var Handlebars = require(\'handlebars\');\n module.exports[\'<%= name %>\'] = <%= handlebars %>'
    }))
    .pipe(plugins.concat('templates.js'))
    .pipe(gulp.dest(paths.js.dest));
});


// ========================================
// Create Watch Task
// ========================================

gulp.task('watch', function() {
  gulp.watch(paths.js.src, ['lint-js', 'compile-js']);
  gulp.watch(paths.css.src, ['compile-sass']);
  gulp.watch(paths.templates.src, ['templates']);
});


// ========================================
// Default 'gulp' task
// ========================================

gulp.task('default', ['iconfont', 'compile-sass', 'lint-js', 'templates', 'compile-js', 'watch']);

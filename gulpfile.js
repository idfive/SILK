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
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(plugins.livereload());
});


// ========================================
// Lint Js
// ========================================

// Finds and reports errors within assets/js/
gulp.task('lint-js', function() {
  return gulp.src(paths.js.src)
    // https://www.npmjs.com/package/gulp-jshint
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});


// ========================================
// Compile js
// ========================================

// Compiles js from assets/js/, aggregated silk js modules, concatenates js
gulp.task('compile-js', function() {
  return gulp.src(paths.js.compile)
  	.pipe(plugins.include())
    .pipe(plugins.plumber())
    .pipe(gulp.dest(paths.js.dest))
    // https://www.npmjs.com/package/gulp-uglify
    .pipe(plugins.uglify({
      mangle: false
    }))
    .pipe(gulp.dest(paths.js.dest));
});


// ========================================
// Compile Handlebars
// ========================================

// Compile Handlebars templates from assets/js/templates
// Custom compilation: node >> handlebars <input> -f <output>
gulp.task('compile-templates', function() {
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

// Defines all the tasks which run when 'gulp watch' is executed
// This task is executed by default when 'gulp' is executed
gulp.task('watch', function() {
  plugins.livereload.listen();
  gulp.watch(paths.scss.src, ['compile-sass']);
  gulp.watch(paths.js.src, ['lint-js', 'compile-js']);
  gulp.watch(paths.templates.src, ['compile-templates']);
});


// ========================================
// Default 'gulp' task
// ========================================

// Defines all the tasks which run when 'gulp' is executed
gulp.task('default', ['iconfont', 'compile-sass', 'lint-js', 'compile-js', 'compile-templates', 'watch']);

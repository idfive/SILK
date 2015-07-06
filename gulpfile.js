//Require
var gulp = require('gulp');
var globbing = require('gulp-css-globbing');
var plugins = require('gulp-load-plugins')();

//Set paths
var paths =
{
	css:
	{
		src:	'assets/scss/**/*.scss',
		dest:	'assets/css'
	},
	icons:
	{
		src: 	'assets/icons/*.svg',
		targetPath: '../scss/base/_icons.scss',
      	fontPath: '../fonts/',
		dest: 	'assets/fonts/'
	},
	js:
	{
		src:	'assets/js/*.js',
		dest:	'assets/js/build'
	},
	templates:
	{
		src:	'assets/js/templates/**/*'
	}
};

//Icon Font Name
var fontName = 'idfive'; //Change to project name

//Create Icon font
gulp.task('iconfont', function()
{
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

//Compile SASS
gulp.task('compile-sass', function()
{
  return gulp
		.src(paths.css.src)
		// add globbing
    .pipe(globbing({
        // Configure it to use SCSS files
        extensions: ['.scss']
    }))
		.pipe(plugins.rubySass({
			style: 'compressed',
			precision: 8
		}))
    .pipe(gulp.dest(paths.css.dest));
});

//Lint JS
gulp.task('lint-js', function()
{
    return gulp
    	.src(paths.js.src)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'));
});

//Compile Handlebars
gulp.task('templates', function()
{
    gulp.src(paths.templates.src)
        .pipe(plugins.handlebars())
        .pipe(plugins.defineModule('plain', {
            require: { Handlebars: 'handlebars'},
            wrapper: 'var Handlebars = require(\'handlebars\');\n module.exports[\'<%= name %>\'] = <%= handlebars %>'
        }))
        .pipe(plugins.concat('templates.js'))
        .pipe(gulp.dest(paths.js.dest));
});

//Compile JS
gulp.task('compile-js', function()
{
	return gulp
		.src(paths.js.src)
		.pipe(plugins.plumber())
		.pipe(plugins.browserify())
		.pipe(gulp.dest(paths.js.dest))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(paths.js.dest));
});

//Create watch tasks
gulp.task('watch', function()
{
    gulp.watch(paths.js.src, ['lint-js', 'compile-js']);
    gulp.watch(paths.css.src, ['compile-sass']);
    gulp.watch(paths.templates.src, ['templates']);
});

// Default Task
gulp.task('default', ['iconfont', 'compile-sass', 'lint-js', 'templates', 'compile-js', 'watch']);

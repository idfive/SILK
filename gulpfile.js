var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	sass = require('gulp-sass'),
	neat = require('node-neat').includePaths,
	jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat');
	
var paths = {
	scss: './assets/scss/**/*.scss',
	js: './assets/js/*.js'
};

// Compile SCSS and add Bourbon & Neat
gulp.task('styles', function() {
	return gulp.src(paths.scss)
		.pipe(sass({
			includePaths: ['styles'].concat(neat)
		}))
		.pipe(gulp.dest('./assets/css'));
});

// Lint Js
gulp.task('lint', function() {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(paths.js)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./assets/js/main'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/main'));
});

gulp.task('watch', function() {
    gulp.watch('assets/js/*.js', ['lint', 'scripts']);
    gulp.watch('assets/scss/**/*.scss', ['styles']);
});

// Default Task
gulp.task('default', ['styles', 'lint', 'scripts', 'watch']);
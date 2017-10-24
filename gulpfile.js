// Include required node/gulp tools

var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cleanCSS = require('gulp-clean-css');
var cssbeautify = require('gulp-cssbeautify');
var del = require('del');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');





//Package file
var PKG = require('./package.json');

// Source files
var SRC_CSS = 'src/css/*.scss';
var SRC_JS = 'src/js/*.js';

// Destination directories
var DEST_CSS = 'dist/css';
var DEST_JS = 'dist/js';





// ****************************** CSS ******************************

// CLEAN CSS
gulp.task('clean:css', function () {
	return del([DEST_CSS]);
});


//Build CSS
gulp.task('build:css', ['clean:css'], function () {
	return gulp.src(SRC_CSS)
			.pipe(sass().on('error', sass.logError))
			.pipe(postcss( [autoprefixer({browsers: ['last 10 versions']})] ))
			.pipe(cssbeautify({ autosemicolon: true }))
			.pipe(gulp.dest(DEST_CSS))
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest(DEST_CSS));
});





// ****************************** JS ******************************

// CLEAN JS
gulp.task('clean:js', function () {
	return del([DEST_JS]);
});


// Lint JS
gulp.task('lint:js', function() {
	return gulp.src(SRC_JS)
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(jshint.reporter('fail'));
});


// Banner for JS file
var banner = ['/**',
		' * <%= pkg.name %>',
		' * Description - <%= pkg.description %>',
		' * @version v<%= pkg.version %>',
		' * @link <%= pkg.homepage %>',
		' * @license <%= pkg.license %>',
		' */',
		'',
		''].join('\n');

// Build JS
gulp.task('build:js', ['clean:js', 'lint:js'], function() {
	return gulp.src(SRC_JS)
			.pipe(header(banner, { pkg : PKG } ))
			.pipe(gulp.dest(DEST_JS))
			.pipe(uglify({output: {comments:'some'}}))
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest(DEST_JS));
});





// ****************************** WATCH ******************************

// WATCH for file changes and run the tasks
gulp.task('watch', function() {
    gulp.watch(SRC_JS, ['build:js']);
    gulp.watch(SRC_CSS, ['build:css']);
});


